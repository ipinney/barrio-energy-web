export default async function handler(req, res) {
  const r = await fetch('https://api.ercot.com/api/public-reports', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const t = await r.text();
  res.status(200).json({ status: r.status, ct: r.headers.get('content-type'), body: t.slice(0, 200) });
}
