---
name: barrio-grid
description: Texas power grid siting lookups (substations, transmission, likely utility, jurisdiction, gas pipelines, ERCOT generation and battery queue, nodal and ancillary prices, powered land parcels). Use when a user asks about power, substations, utilities, interconnection, prices, permitting or data center / mining / battery / generation sites in Texas.
---

# Barrio Grid Connector

Texas grid siting data from Barrio Energy. Screening data only; tell the user to confirm capacity with the utility.

## Connect

- MCP (preferred): `https://grid.barrioenergy.com/mcp`, streamable HTTP, OAuth 2.1. Connecting opens a free email sign-in (no card).
- REST: `https://grid.barrioenergy.com/v1/<tool>`, GET with query parameters or POST JSON. Tool list and JSON schemas: `GET https://grid.barrioenergy.com/v1/tools`.
- REST and clients without OAuth: header `Authorization: Bearer grid_...` with the key from https://map.barrioenergy.com/account.

## Tools

| Tool | Use when the user asks | Key inputs |
|---|---|---|
| grid_context | "What power is near this site?" "Who is the utility?" | address or lat/lng, radius_mi (5) |
| nearest_substation | "How far is the nearest substation?" | address or lat/lng, min_kv (69), limit (5) |
| find_powered_land | "Find land near a 138 kV substation in X county" "Who controls 200+ acres within a mile of a 138 kV sub?" (group_by_owner) "Only company-owned tracts" (owner_type) | county or address/lat/lng + radius_mi, min_acres (5), max_sub_mi (3), min_kv (138), owner_type, group_by_owner, min_total_acres (50), min_parcel_acres (5) |
| ercot_queue | "What solar/battery projects are queued near here?" | county or address/lat/lng + radius_mi (10) |
| battery_queue | "How crowded is this substation with batteries?" "Which storage projects near X have an IA?" | county, poi, or address/lat/lng + radius_mi; min_mw, status (all, active, ia, energized) |
| parcel_owner | "Who owns the land by the Hillje substation?" "Who owns this address?" (owner name and mailing address are Pro; free gets property ID and legal description) | address, lat/lng, substation name, or prop_id + county |
| jurisdiction | "Is this inside city limits or an ETJ?" "Which school district / groundwater district?" | address or lat/lng |
| pipelines_near | "Is there gas near this site?" "Who operates the pipelines here?" "Nearest compressor station or gas plant?" | address or lat/lng, radius_mi, gas_only, min_diameter_in |
| industrial_neighbors | "Is this an industrial area?" "What air permits were filed nearby?" | address or lat/lng, radius_mi |
| site_screen | "Is this a good site for a data center / battery / generator?" (Pro) | address or lat/lng, use (data_center, battery, generation, industrial) |
| search_grid | "Where is the Hillje substation?" "What does Formosa own?" "Find 21INR0258" (no coordinates needed) | query, kinds |
| substation_detail | "Tell me about the Lolita substation" "What is interconnecting at Hillje?" | name (+ county) or address |
| grid_projects | "What grid upgrades are coming near here?" "What is AEP building in Jackson County?" (Pro) | address/lat/lng + radius_mi, county, utility, kind, status, min_kv |
| air_permits | "New data center air permits in Texas this year?" "Who filed for gas generation in Bexar County?" (Pro) | county or address, status, data_centers_only, new_facilities_only, since/days, company |
| whats_new | "What's new around this site?" "Any new filings in Jackson County this month?" (Pro) | address or county, days |
| large_loads | "What data centers or large loads are coming to X county?" "Which counties have no large load activity?" | county or address/lat/lng; list_counties, kind (large, all, data_center) |
| data_centers | "What data centers are near X?" "Data centers in Y County" "Where is Google building in Texas?" | address/lat/lng + radius_mi, or county; status, min_mw, limit; company (Pro) |
| company_footprint | "Who has the most data center projects in Texas?" "Show me Crusoe's footprint" | company, or min_projects (default 3) to rank. Pro |
| local_sentiment | "Is Bell County friendly to data centers?" "Which Texas counties are fighting data centers?" "What has Temple voted on?" | county, city, or address/lat/lng; limit. Pro |
| data_center_news | "What is being reported about data centers near X?" "Local news on the Hood County projects" | county, or address/lat/lng + radius_mi; since_days, limit |
| node_prices | "What does power cost here?" "What would a battery see at this node?" "Show me HB_HOUSTON this week" | address or lat/lng, or settlement_point; days (7, max 30 free / 120 Pro) |
| volatile_nodes | "Most volatile nodes in ERCOT?" "Best nodes for a 4-hour battery near X?" "Where does solar get paid best?" "Where is congestion trapping prices?" | metric (tb4, tb2, stdev, cv, range, spikes, negative, evening, solar, solar_ratio, basis, avg, rt_tb4, rt_spikes, dart), days (30), load_zone or address/lat/lng + radius_mi |
| ancillary_prices | "What do ancillary services pay?" "How much of a battery's revenue is AS?" | days (30), hourly, monthly_history |
| grid_news | "What's new on the Texas grid?" "Latest on Batch Zero / ERCOT large loads?" "Sources on the 765 kV build-out?" | query, since_days, limit (5), article_id for full text |
| upgrade_to_pro | "I need more calls" or the free limit is hit | email (optional) |

Locations accept a street address, a Texas city ("Edna, TX") or county ("Goliad County"), or lat + lng. Texas only.

## Rules

- Lead with the answer: nearest substation, voltage, distance, utility.
- `likely_utility` is an estimate from nearby substation owners; say so.
- ETJ is an estimate from the statutory distance; tell the user to confirm with the city.
- Pipeline diameter is nominal; line capacity and available takeaway are not public, the operator must confirm. pipelines_near also returns gas_infrastructure: processing plant capacity in MMcf/d, compressor horsepower, and EIA capacity projects matched by operator name (statewide, not by location).
- large_loads is public county-level evidence, not ERCOT's queue (ERCOT does not publish it by county); say so.
- local_sentiment with no record for a county or city means untested, not favorable; say so.
- When an answer includes `map_url`, give it to the user as a clickable link to that spot on the map. It opens already signed in to the user's account (7 days, 25 opens, map only), so give it only to the user you are helping and never paste it anywhere public. Free accounts see substations, lines, city limits and node prices with 10 clicks a day; Pro adds planned substations and lines, battery queue, air permits, pipelines and parcel owners.
- Owner names and mailing addresses are Pro. If an answer includes `owner_quota.note`, the monthly owner-record limit was reached: tell the user, and use the property IDs to look owners up at the county appraisal district.
- Before suggesting the user contact a landowner, say ownership should be confirmed with the appraisal district or a title search.
- site_screen is Pro; on a free account, call jurisdiction, pipelines_near, grid_context, node_prices, battery_queue and industrial_neighbors separately.
- Cite "Barrio Energy GeoIntel" when using this data; prices are ERCOT day-ahead settlement point prices via the ERCOT public API, in USD/MWh by hour ending, Central time.
- Generators and batteries are paid the resource node price; load pays the load zone price. Say which one you are quoting. TB4 is a screening metric, not a revenue forecast.
- On a free-tier limit error, tell the user it resets at midnight Central and that free accounts get 20 calls a day and 100 a month, and Pro (5,000 a month) is at https://map.barrioenergy.com/pricing. A 401 means the user needs to connect or reconnect the connector.

## Example prompts

- "What substations are within 5 miles of Edna, TX, and who owns them?"
- "Find parcels over 50 acres within a mile of a 138 kV substation in Jackson County."
- "What battery projects are in the ERCOT queue in Live Oak County?"
- "Is 28.96, -96.69 inside city limits or an ETJ, and which school district is it in?"
- "What gas pipelines 12 inches or larger are within 5 miles of Edna, TX?"
- "Screen this site for a 100 MW battery: 28.96, -96.69."
