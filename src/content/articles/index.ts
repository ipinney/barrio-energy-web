export type Article = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  author: string;
  excerpt: string;
  readingTime?: string;
  body: string; // HTML string
  image?: string;
};

export const articles: Article[] = [
  {
    slug: "we-are-no-longer-a-bitcoin-company",
    title: '"We Are No Longer a Bitcoin Company" — And That\'s Just the Start of Texas Power\'s Wildest Week',
    date: "2026-02-13",
    author: "Andi",
    excerpt: "Bitfarms rebrands as Keel Infrastructure, Google signs a 1 GW solar PPA in Texas, and ERCOT admits its interconnection queue is stuck in a 'study doom loop.' This week reshaped the Texas power landscape.",
    readingTime: "5 min read",
    body: `
<p>On Thursday morning, Ben Gagnon stood up in front of investors and said the quiet part out loud: <strong>"We are no longer a Bitcoin company."</strong> His company, formerly Bitfarms, is now <a href="https://www.coindesk.com/business/2026/02/06/bitfarms-says-it-s-no-longer-a-bitcoin-company-doubling-down-on-ai-with-u-s-move" target="_blank" style="color: #00d4ff;">Keel Infrastructure</a> — redomiciled from Canada to Delaware, pivoted from mining rigs to server racks, and betting the whole house on AI. Three days later, Google signed the <a href="https://totalenergies.com/news/press-releases/united-states-totalenergies-provide-1-gw-solar-capacity-power-googles-data" target="_blank" style="color: #00d4ff;">largest renewable PPA in TotalEnergies' American history</a> — a full gigawatt of solar capacity destined for Texas data centers. And somewhere in Austin, ERCOT's grid planners admitted they're stuck in what one VP called a "study doom loop," unable to process interconnection requests faster than they arrive.</p>

<p>Welcome to the week that made clear: Texas isn't just part of the AI infrastructure story anymore. Texas <em>is</em> the story.</p>

<h2>The Miners Are Leaving. The Question Is Whether They Can Pivot Fast Enough.</h2>

<p>Let's be honest about what happened to Bitcoin mining this week: it got ugly.</p>

<p><a href="https://www.coindesk.com/markets/2026/02/09/bitcoin-mining-difficulty-drops-by-most-since-2021-as-miners-capitulate" target="_blank" style="color: #00d4ff;">Mining difficulty dropped roughly 11%</a> — the biggest single decline since the Chinese government effectively banned the industry in 2021. Hashprice cratered to $35/TH/s. On February 5, public miner stocks got hammered in unison: CleanSpark down 10%, Marathon Digital down 11%, TeraWulf down 8.5%, Riot Platforms off 4.8%. It was the kind of day that makes CFOs update their résumés.</p>

<p>Then Winter Storm Fern rolled through Texas and demonstrated, once again, the peculiar position Bitcoin miners occupy on the ERCOT grid. <a href="https://www.mara.com/posts/balancing-the-grid-during-winter-storm-fern" target="_blank" style="color: #00d4ff;">MARA curtailed about 550 MW of load in ERCOT</a> — 770 MW globally — as spot prices spiked to $1,200/MWh. Across the system, an estimated 12 GW of mining load was shed. MARA framed it as civic virtue: <strong>"Bitcoin mining is interruptible, we can power down our facilities in minutes, freeing up substantial capacity on the grid."</strong> That's true. It's also true that getting paid nothing while the grid charges everyone else $1,200 per megawatt-hour is not exactly a business model you pitch to growth investors.</p>

<p>Which is why the Bitfarms-to-Keel rebrand matters beyond the name change. Gagnon isn't just chasing a trend — he's following a survival instinct shared by every public miner watching their margins compress in real time. Core Scientific got there first with its CoreWeave deal. IREN, CleanSpark, and TeraWulf are all at various stages of the same pivot. The pitch is simple: these companies hold land, power interconnections, and transmission access in a market where hyperscalers are desperate for all three. The hard part is converting a mining site into something a Google or a Microsoft would actually lease. That takes capital, engineering, and time — three things miners are short on.</p>

<h2>The Hyperscalers Are Writing Checks That Would Make Defense Contractors Blush</h2>

<p>The sheer volume of capital committed to Texas data centers this week borders on parody. Except these aren't concept decks — they're signed contracts.</p>

<p>Google's $40 billion Texas commitment by 2027 got a tangible milestone on February 9, when <a href="https://totalenergies.com/news/press-releases/united-states-totalenergies-provide-1-gw-solar-capacity-power-googles-data" target="_blank" style="color: #00d4ff;">TotalEnergies announced the 1 GW solar PPA</a>. TotalEnergies SVP Marc-Antoine Pignon called it the largest renewable PPA volume the company has ever signed in the United States. Google is also <a href="https://www.businessinsider.com/eric-schmnidt-data-center-firm-negotiating-texas-deal-with-google-2026-2" target="_blank" style="color: #00d4ff;">in negotiations with Bolt Data</a> — the data center company backed by former Alphabet CEO Eric Schmidt — for a 250 MW deal at a West Texas campus that could eventually scale to 5 GW. That's not a typo. Five gigawatts. For one campus.</p>

<p>Oracle's Stargate project near Abilene is targeting 1.2 GW with $38 billion in financing, though word on the street is JPMorgan is having trouble syndicating the debt. That's worth watching — a $38 billion deal that can't find enough lenders tells you something about risk appetite at the margins.</p>

<p><a href="https://www.stocktitan.net/news/CEG/constellation-and-cyrus-one-announce-agreement-to-support-new-data-8gs2kj3dirrf.html" target="_blank" style="color: #00d4ff;">Constellation Energy and CyrusOne locked in 1,100+ MW</a> across two Texas sites — Freestone County and Thad Hill. Constellation CEO Joe Dominguez offered the obligatory patriotic framing: <strong>"Constellation is helping lay the foundation that will keep America at the forefront of AI and digital technology."</strong> Fine. More relevantly, Constellation is positioning itself as the go-to power provider for data centers at a scale that makes its nuclear fleet look purpose-built for this moment.</p>

<p>And the pipeline keeps growing. <a href="https://www.datacenterdynamics.com/en/news/multi-gigawatt-data-center-campus-planned-in-east-texas/" target="_blank" style="color: #00d4ff;">Amp Z wants to build a $1B+ campus on 1,000 acres near Lufkin</a>. Black Mountain's $10 billion Fort Worth megaproject is stuck in city council approvals. Rick Perry's Fermi Energy has an 11 GW fantasy planned for Amarillo, except Amazon just pulled a $150 million advance — not a great sign. And in a move that captures the surreal tenor of the moment, the <a href="https://defensescoop.com/2026/02/06/trump-military-bases-army-lease-land-data-centers/" target="_blank" style="color: #00d4ff;">U.S. Army is leasing Fort Hood and Fort Bliss to data center developers</a> on 50-year terms. Proposals are due February 23.</p>

<p>Morgan Stanley put a number on the overall picture: the Big 4 hyperscalers are projected to spend roughly <strong>$700 billion</strong> in 2026 capex, and the bank expects <strong>"upward pressure on hyperscaler capex estimates"</strong> to continue.</p>

<p>Curt Holcomb at JLL laid it out: <strong>"Texas, and ERCOT in particular, is experiencing more demand and requests for power capacity than any other region in the country."</strong> No kidding.</p>

<h2>ERCOT's Doom Loop: Too Much Demand, Not Enough Process</h2>

<p>Here's where the optimism runs headlong into physics.</p>

<p>ERCOT's demand forecast now projects 145 GW by 2031. The grid currently has about 85 GW of installed capacity. That's a 70% gap, and the timeline is five years. Jeff Billo, ERCOT's VP of grid planning, <a href="https://www.houstonpublicmedia.org/articles/news/energy-environment/2026/02/10/543043/ercot-to-update-planning-process-for-connecting-data-centers-other-large-loads-to-texas-power-grid/" target="_blank" style="color: #00d4ff;">told Houston Public Media</a> this week that the interconnection queue has devolved into a recursive nightmare: <strong>"We are continually having to restudy those large loads."</strong> Every time a multi-hundred-megawatt data center enters the queue, it triggers restudies of the projects already in line. ERCOT is now switching to a batch study process to try to break the cycle and may revisit 8.2 GW of previously approved load.</p>

<p>Billo acknowledged what everyone in the Texas energy world already knows: <strong>"All that AI magic happens at a data center... a lot of those data centers are being built in Texas."</strong></p>

<p>SB6 is trying to add financial collateral requirements — essentially making developers put real money behind their interconnection applications to weed out the speculators from the builders. Nationally, <a href="https://justthenews.com/nation/states/center-square/surge-gas-fired-power-data-centers-texas-leading" target="_blank" style="color: #00d4ff;">252 GW of gas-fired generation is in planning stages</a>, a lot of it aimed at Texas. But "planned" and "operating" are very different words in power development.</p>

<p>The irony isn't lost on anyone: the Bitcoin miners who already have grid connections — the ones pivoting to AI — may end up holding the most valuable asset in the state. Not because of what they built, but because of the queue position they're sitting on. In a market where getting plugged in might take years, being plugged in already is worth more than the facility itself.</p>

<h2>What to Watch Next Week</h2>

<p><strong>February 23</strong> brings the deadline for Army data center proposals at Fort Hood and Fort Bliss — the bidder list will reveal how seriously the defense establishment is taking this play. Keep an eye on JPMorgan's progress syndicating Oracle/Stargate's $38 billion. If that deal doesn't come together, it reshuffles the deck in West Texas. ERCOT's batch study details will start defining winners and losers in the interconnection queue. And if hashprice stays pinned below $35/TH/s, expect at least one more public miner to drop the word "Bitcoin" from its investor deck before the month is out.</p>

<hr style="border: none; border-top: 1px solid #3f3f46; margin: 40px 0;" />

<p><em>Barrio Energy provides independent analysis of Texas power markets, data center development, and digital infrastructure. This is not investment advice.</em></p>
    `,
  },
];

// Helper: get all articles sorted by date (newest first)
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Helper: get a single article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// Helper: estimate reading time
export function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

// Helper: format date
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
