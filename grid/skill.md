---
name: barrio-grid
description: Texas power grid siting lookups (substations, transmission, likely utility, jurisdiction, gas pipelines, ERCOT generation and battery queue, nodal and ancillary prices, powered land parcels). Use when a user asks about power, substations, utilities, interconnection, prices, permitting or data center / mining / battery / generation sites in Texas.
---

# Barrio Grid Connector

Texas grid siting data from Barrio Energy. Screening data only; tell the user to confirm capacity with the utility.

## Connect

- MCP (preferred): `https://grid.barrioenergy.com/mcp`, streamable HTTP, no auth on the free tier.
- REST: `https://grid.barrioenergy.com/v1/<tool>`, GET with query parameters or POST JSON. Tool list and JSON schemas: `GET https://grid.barrioenergy.com/v1/tools`.
- Pro key, if the user has one: header `Authorization: Bearer grid_...`.

## Tools

| Tool | Use when the user asks | Key inputs |
|---|---|---|
| grid_context | "What power is near this site?" "Who is the utility?" | address or lat/lng, radius_mi (5) |
| nearest_substation | "How far is the nearest substation?" | address or lat/lng, min_kv (69), limit (5) |
| find_powered_land | "Find land near a 138 kV substation in X county" | county or address/lat/lng + radius_mi, min_acres (5), max_sub_mi (3), min_kv (138) |
| ercot_queue | "What solar/battery projects are queued near here?" | county or address/lat/lng + radius_mi (10) |
| battery_queue | "How crowded is this substation with batteries?" "Which storage projects near X have an IA?" | county, poi, or address/lat/lng + radius_mi; min_mw, status (all, active, ia, energized) |
| jurisdiction | "Is this inside city limits or an ETJ?" "Which school district / groundwater district?" | address or lat/lng |
| pipelines_near | "Is there gas near this site?" "Who operates the pipelines here?" | address or lat/lng, radius_mi, gas_only, min_diameter_in |
| industrial_neighbors | "Is this an industrial area?" "What air permits were filed nearby?" | address or lat/lng, radius_mi |
| site_screen | "Is this a good site for a data center / battery / generator?" (Pro) | address or lat/lng, use (data_center, battery, generation, industrial) |
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
- Pipeline diameter is nominal; capacity and available takeaway are not public, the operator must confirm.
- When an answer includes `map_url`, give it to the user as a link to that spot on the map.
- site_screen is Pro; on a free key, call jurisdiction, pipelines_near, grid_context, node_prices, battery_queue and industrial_neighbors separately.
- Cite "Barrio Energy GeoIntel" when using this data; prices are ERCOT day-ahead settlement point prices via the ERCOT public API, in USD/MWh by hour ending, Central time.
- Generators and batteries are paid the resource node price; load pays the load zone price. Say which one you are quoting. TB4 is a screening metric, not a revenue forecast.
- On a free-tier limit error, tell the user it resets at midnight Central and that a free key (100 a day) or Pro is at https://map.barrioenergy.com.

## Example prompts

- "What substations are within 5 miles of Edna, TX, and who owns them?"
- "Find parcels over 50 acres within a mile of a 138 kV substation in Jackson County."
- "What battery projects are in the ERCOT queue in Live Oak County?"
- "Is 28.96, -96.69 inside city limits or an ETJ, and which school district is it in?"
- "What gas pipelines 12 inches or larger are within 5 miles of Edna, TX?"
- "Screen this site for a 100 MW battery: 28.96, -96.69."
