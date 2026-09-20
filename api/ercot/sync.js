// Fallback ERCOT day-ahead price sync. Primary puller runs on spark (ercot_pull.py);
// this runs daily on Vercel cron so the map keeps updating if spark is offline.
// Protected by CRON_SECRET (Vercel sends it as Authorization: Bearer for cron invocations).
const API = "https://api.ercot.com/api/public-reports";
const TOKEN_URL = "https://ercotb2c.b2clogin.com/ercotb2c.onmicrosoft.com/B2C_1_PUBAPI-ROPC-FLOW/oauth2/v2.0/token";
const CLIENT = "fec253ea-0d06-4272-a5e6-b478baeecd70";

async function token() {
  const body = new URLSearchParams({ username: process.env.ERCOT_USER, password: process.env.ERCOT_PASS, grant_type: "password",
    scope: `openid ${CLIENT} offline_access`, client_id: CLIENT, response_type: "id_token" });
  const r = await fetch(TOKEN_URL, { method: "POST", body });
  if (!r.ok) throw new Error("ercot token " + r.status);
  return (await r.json()).id_token;
}
async function rpc(fn, payload) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/${fn}`, { method: "POST", headers: {
    apikey: process.env.SUPABASE_SERVICE_KEY, Authorization: "Bearer " + process.env.SUPABASE_SERVICE_KEY, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(`supabase ${fn} ${r.status} ${(await r.text()).slice(0, 200)}`);
  const t = await r.text(); return t ? JSON.parse(t) : null;
}
const iso = (d) => d.toISOString().slice(0, 10);

export default async function handler(req, res) {
  const auth = req.headers.authorization || "";
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "unauthorized" });
  const t0 = Date.now();
  try {
    const now = new Date();
    const from = new Date(now.getTime() - 86400e3), to = new Date(now.getTime() + 86400e3);
    const tok = await token();
    const u = `${API}/np4-190-cd/dam_stlmnt_pnt_prices?deliveryDateFrom=${iso(from)}&deliveryDateTo=${iso(to)}&size=100000`;
    const r = await fetch(u, { headers: { Authorization: "Bearer " + tok, "Ocp-Apim-Subscription-Key": process.env.ERCOT_SUB_KEY, "User-Agent": "BarrioGrid/1.0" } });
    if (!r.ok) throw new Error("ercot " + r.status);
    const data = (await r.json()).data || [];
    const rows = data.filter((x) => !x[4]).map(([dd, he, sp, price]) => [sp, dd, Number(he.split(":")[0]), price]);
    let n = 0;
    for (let i = 0; i < rows.length; i += 6000) n += (await rpc("grid_ercot_upsert_dam", { rows: rows.slice(i, i + 6000) })) || 0;
    await rpc("grid_ercot_refresh_daily", { p_from: iso(from), p_to: iso(to) });
    await rpc("grid_ercot_sync_mark", { p_job: "dam_vercel", p_range: `${iso(from)}..${iso(to)}`, p_rows: n });
    return res.status(200).json({ ok: true, rows: n, ms: Date.now() - t0 });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message, ms: Date.now() - t0 });
  }
}
