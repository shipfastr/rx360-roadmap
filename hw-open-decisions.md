# Rx360 Hardware — Open Decisions

## 1. SoC Platform Strategy (URGENT — gates timeline)
**Decision needed by:** Feb 13, 2026
**Options:**

### Option A: Dual-track (recommended)
- Ship PCB v1 / LRIP on Qualcomm (current 80% board)
- Evaluate Nordic in parallel on dev kits during EVT
- If Nordic wins → PCB v2 for mass production
- **Pro:** No timeline slip, data-driven decision
- **Con:** Potential throwaway work if Nordic wins

### Option B: Pause and evaluate Nordic first
- Hold PCB completion until chip bake-off is done
- Compare power, cost, SDK, BLE performance head-to-head
- **Pro:** Only build one board
- **Con:** 6-8 week delay to timeline, evaluation may not be conclusive without a real board

### Option C: Commit to Qualcomm fully
- Finish v1, scale on it
- Skip Nordic evaluation
- **Pro:** Fastest path
- **Con:** May leave performance/cost on the table

**Key factors to weigh:**
- Unit BOM cost difference at scale (1k, 10k, 100k units)
- Power consumption (battery life target for seniors — 5+ days?)
- SDK maturity and firmware team familiarity
- LTE modem compatibility with each SoC
- Long-term supply chain risk

## 2. LTE Modem Selection (URGENT)
**Decision needed by:** Feb 13, 2026
- Cat-M1/NB-IoT (likely) vs full LTE
- Leading candidates: Quectel BG95/BG96, Nordic nRF9160 (if going Nordic SoC)
- Must validate antenna coexistence with BLE on current board layout

## 3. CM Selection
**Status:** Shortlist exists, deciding soon
- DFM review needed once PCB is 100%
- Should be locked before EVT completes
