---
name: barrio-grid
description: Texas power grid siting lookups (nearest substations, transmission, likely utility, ERCOT queue, powered land parcels). Use when a user asks about power, substations, utilities, interconnection or data center / mining / battery sites in Texas.
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
| node_prices | "What does power cost here?" "What would a battery see at this node?" "Show me HB_HOUSTON this week" | address or lat/lng, or settlement_point; days (7, max 30 free / 120 Pro) |
| volatile_nodes | "Most volatile nodes in ERCOT?" "Best nodes for a 4-hour battery near X?" "Where does solar get paid best?" "Where is congestion trapping prices?" | metric (tb4, tb2, stdev, cv, range, spikes, negative, evening, solar, solar_ratio, basis, avg), days (30), load_zone or address/lat/lng + radius_mi |
| grid_news | "What's new on the Texas grid?" "Latest on Batch Zero / ERCOT large loads?" "Sources on the 765 kV build-out?" | query, since_days, limit (5), article_id for full text |
| upgrade_to_pro | "I need more calls" or the free limit is hit | email (optional) |

Locations accept a street address, a Texas city ("Edna, TX") or county ("Goliad County"), or lat + lng. Texas only.

## Rules

- Lead with the answer: nearest substation, voltage, distance, utility.
- `likely_utility` is an estimate from nearby substation owners; say so.
- Cite "Barrio Energy GeoIntel" when using this data; prices are ERCOT day-ahead settlement point prices via the ERCOT public API, in USD/MWh by hour ending, Central time.
- Generators and batteries are paid the resource node price; load pays the load zone price. Say which one you are quoting. TB4 is a screening metric, not a revenue forecast.
- On a free-tier limit error, tell the user it resets at midnight Central and that a free key (100 a day) or Pro is at https://map.barrioenergy.com.

## Example prompts

- "What substations are within 5 miles of Edna, TX, and who owns them?"
- "Find parcels over 50 acres within a mile of a 138 kV substation in Jackson County."
- "What battery projects are in the ERCOT queue in Live Oak County?"
