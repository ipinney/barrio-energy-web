export type Article = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  author: string;
  excerpt: string;
  body: string; // HTML string
  image?: string;
};

export const articles: Article[] = [
  {
    slug: "texas-power-infrastructure-week-in-review",
    title: "Texas Power Infrastructure: Week in Review",
    date: "2026-02-10",
    author: "Andi",
    excerpt:
      "A look at the latest AI data center deals reshaping Texas energy markets — from billion-dollar campus announcements to grid interconnection bottlenecks across ERCOT.",
    image: "/images/landscape-datacenter-1.jpg",
    body: `
<p>The Texas energy landscape is shifting faster than anyone predicted. This week alone, three major announcements underscored how artificial intelligence is fundamentally reshaping power demand across the ERCOT grid — and why companies like Barrio Energy are positioned at the epicenter of that transformation.</p>

<h2>Hyperscalers Double Down on Texas</h2>

<p>On Monday, a leading hyperscale cloud provider confirmed plans for a 500 MW data center campus outside of Abilene, marking one of the largest single-site commitments in the state's history. The project, expected to break ground in Q3 2026, will require dedicated transmission infrastructure and is already driving conversations about behind-the-meter generation solutions.</p>

<p>This follows a pattern we've tracked for months: major technology companies are bypassing traditional coastal markets in favor of Texas, drawn by lower land costs, favorable regulatory environments, and — most critically — direct access to abundant power through ERCOT's deregulated market structure.</p>

<h2>Grid Interconnection: The New Bottleneck</h2>

<p>While demand continues to surge, the practical challenge of connecting new loads to the grid has become the defining constraint of 2026. ERCOT's interconnection queue now exceeds 300 GW of proposed generation and load — a staggering figure that reflects both genuine demand and speculative positioning.</p>

<p>For operators with existing grid connections and energized substations, this bottleneck represents a significant competitive advantage. Properties that are already interconnected — like the sites in Barrio Energy's portfolio — can offer tenants immediate access to power, bypassing the 18- to 36-month timelines that new developments face.</p>

<h2>What This Means for Industrial Real Estate</h2>

<p>The convergence of AI compute demand and grid constraints is creating a new asset class: power-ready industrial properties. These aren't traditional data centers with raised floors and redundant cooling systems. They're substations, switchyards, and industrial sites with high-voltage connections capable of delivering 10, 50, or 100+ MW to a single tenant.</p>

<p>At Barrio Energy, we've been acquiring and developing these properties across Texas for this exact scenario. Our portfolio spans West Texas to the Gulf Coast, with sites ranging from 7.5 MW to 13 MW — and growing. Each property was selected for its grid position, power availability, and expansion potential.</p>

<h2>Looking Ahead</h2>

<p>Next week, we'll be watching several key developments: the Texas PUC's upcoming session on large load interconnection policy, two major lease announcements expected from Bitcoin mining operators transitioning to AI workloads, and continued activity in the Permian Basin where energy and compute are increasingly co-located.</p>

<p>The Texas power infrastructure story is far from over. If anything, it's just getting started. Stay tuned for our weekly updates as we track the deals, policies, and trends shaping the future of energy in the Lone Star State.</p>
    `,
  },
  {
    slug: "ercot-demand-response-summer-2026-outlook",
    title: "ERCOT Demand Response: Summer 2026 Outlook",
    date: "2026-02-03",
    author: "Andi",
    excerpt:
      "With record peak demand projections for summer 2026, demand response programs are more valuable than ever. Here's what operators need to know.",
    image: "/images/monahans-property-5.jpg",
    body: `
<p>Summer in Texas means one thing for the energy market: peak demand. And if ERCOT's preliminary forecasts are any indication, summer 2026 could set new records — with peak demand projected to exceed 85 GW under extreme weather scenarios.</p>

<h2>Why Demand Response Matters More Than Ever</h2>

<p>Demand response (DR) programs have always been a cornerstone of ERCOT's reliability strategy, but the math is changing. With AI data centers adding gigawatts of new load to the grid, the traditional balance between supply and demand is under unprecedented pressure. DR programs that pay industrial consumers to curtail usage during peak periods are becoming both more valuable and more strategically important.</p>

<p>For data center operators and industrial load hosts, participation in DR programs represents a dual revenue stream: you earn from your primary operations while also capturing payments for agreeing to reduce consumption when the grid needs relief. It's a win-win that smart operators are increasingly building into their financial models from day one.</p>

<h2>Program Structures and Economics</h2>

<p>ERCOT's Emergency Response Service (ERS) remains the primary vehicle for demand response participation. The program operates in four-hour blocks during peak periods, with operators committing to reduce load within 10 or 30 minutes of an ERCOT instruction. Compensation varies by season and delivery period, but summer capacity payments have trended upward as grid stress increases.</p>

<p>Beyond ERS, operators can participate in the ancillary services market directly — offering responsive reserves or regulation services. These markets have seen significant premium pricing during tight supply conditions, creating opportunities for flexible loads to earn substantial returns.</p>

<h2>How Barrio Energy Approaches DR</h2>

<p>At Barrio Energy, we don't just lease properties — we actively manage our portfolio's relationship with the grid. Our 24/7 monitoring capabilities allow us to participate in demand response programs across our sites, creating additional value for both our tenants and our investors.</p>

<p>We work with our tenants to structure lease agreements that account for DR participation, ensuring that curtailment obligations are clearly defined and economically aligned. The result is a collaborative approach where grid reliability and commercial returns reinforce each other.</p>

<h2>Preparing for Summer</h2>

<p>If you're operating industrial loads in ERCOT, now is the time to evaluate your demand response strategy. Registration deadlines for summer ERS participation typically fall in the spring, and operators who wait until temperatures spike will find themselves locked out of the most lucrative programs.</p>

<p>Contact us if you'd like to discuss how Barrio Energy can help you optimize your grid position and capture demand response revenue this summer.</p>
    `,
  },
  {
    slug: "behind-the-meter-generation-data-centers",
    title: "Behind-the-Meter Generation: The Data Center Advantage",
    date: "2026-01-27",
    author: "Andi",
    excerpt:
      "As grid interconnection timelines stretch past two years, behind-the-meter power generation is emerging as the fastest path to energized data center capacity.",
    image: "/images/tyler-property.jpg",
    body: `
<p>The single biggest constraint facing new data center development in Texas isn't land, capital, or even permitting — it's power. Specifically, it's the timeline required to secure a grid interconnection and energize a new large load. With ERCOT's queue stretching well beyond 24 months for many projects, developers are increasingly looking at behind-the-meter (BTM) generation as a viable — and sometimes superior — alternative.</p>

<h2>What Is Behind-the-Meter Generation?</h2>

<p>Behind-the-meter generation refers to power produced on-site, typically from natural gas generators, solar arrays, or battery storage systems, that serves the facility's load directly without flowing through the utility grid. The "meter" in question is the point of interconnection with the utility — behind it means the power never touches the public grid.</p>

<p>For data centers, BTM generation offers several compelling advantages: faster deployment timelines, reduced exposure to grid congestion pricing, and the ability to scale power capacity in modular increments. A well-designed BTM system can deliver first power to a site in 6 to 12 months — a fraction of the timeline for a traditional grid interconnection.</p>

<h2>The Economics Stack Up</h2>

<p>Critics of BTM generation often point to higher per-megawatt costs compared to grid power. And they're not wrong — on a pure $/MWh basis, running natural gas generators is typically more expensive than purchasing wholesale power from ERCOT. But the comparison misses the bigger picture.</p>

<p>When you factor in the time value of bringing a data center online 18 months earlier, the avoided cost of grid interconnection fees, and the optionality of selling excess power back to the grid during price spikes, the economics of BTM generation look very different. For a 50 MW AI training facility, every month of delay represents millions in lost revenue. BTM generation isn't just a power strategy — it's a business strategy.</p>

<h2>Hybrid Approaches</h2>

<p>The smartest operators aren't choosing between grid and BTM — they're combining both. A hybrid approach uses BTM generation for initial energization and baseload capacity while pursuing grid interconnection in parallel. Once the grid connection is established, the BTM assets transition to backup power and peak-shaving roles, continuing to generate value through demand response and ancillary services.</p>

<p>This approach is particularly well-suited to properties like those in Barrio Energy's portfolio, where existing substations and grid connections can be supplemented with on-site generation to maximize both speed and capacity.</p>

<h2>Regulatory Considerations</h2>

<p>It's worth noting that BTM generation in ERCOT operates under a different regulatory framework than grid-connected generation. Operators need to navigate air quality permits, fuel supply agreements, and noise ordinances — none of which are insurmountable, but all of which require planning and expertise.</p>

<p>At Barrio Energy, we help our tenants evaluate the full spectrum of power options for their sites, from grid-only to fully behind-the-meter to hybrid configurations. The right answer depends on the specific site, timeline, and business requirements — and we make sure our clients have the information they need to make that decision.</p>
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
