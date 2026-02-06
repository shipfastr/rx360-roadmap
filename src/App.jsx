
import { useState } from "react";

const VERSIONS = {
  "v0.5": { color: "#6b7280", label: "Shipped" },
  "v1": { color: "#3b82f6", label: "Core" },
  "v1.5": { color: "#8b5cf6", label: "Expansion" },
  "v2": { color: "#f59e0b", label: "Full Platform" },
};

const HW_PHASES = {
  "proto": { color: "#14b8a6", label: "Prototyping" },
  "lrip": { color: "#f97316", label: "LRIP" },
  "scale": { color: "#ef4444", label: "Scale Mfg" },
};

const swMilestones = [
  { label: "v1 Internal", date: "2026-02-28", color: "#3b82f6", type: "internal" },
  { label: "v1 External", date: "2026-03-31", color: "#3b82f6", type: "external" },
  { label: "v1.5 Internal", date: "2026-04-15", color: "#8b5cf6", type: "internal" },
  { label: "v1.5 External", date: "2026-05-15", color: "#8b5cf6", type: "external" },
  { label: "v2 Placeholder", date: "2026-09-30", color: "#f59e0b", type: "internal" },
];

const hwMilestones = [
  { label: "LTE Modem Locked", date: "2026-02-13", color: "#14b8a6", type: "internal" },
  { label: "PCB 100%", date: "2026-02-27", color: "#14b8a6", type: "internal" },
  { label: "Proto Boards", date: "2026-03-20", color: "#14b8a6", type: "internal" },
  { label: "EVT Complete", date: "2026-05-01", color: "#14b8a6", type: "internal" },
  { label: "BOM Lock", date: "2026-06-01", color: "#f97316", type: "internal" },
  { label: "LRIP Units", date: "2026-07-01", color: "#f97316", type: "internal" },
  { label: "Regulatory Filed", date: "2026-09-15", color: "#ef4444", type: "internal" },
  { label: "PVT Complete", date: "2026-10-15", color: "#ef4444", type: "internal" },
  { label: "Mass Production", date: "2026-10-15", color: "#ef4444", type: "external" },
];

const swLanes = [
  {
    name: "Auth & Onboarding", version: "v1",
    tasks: [{ label: "Auth, onboarding & SSO", start: "2026-02-06", end: "2026-02-20", ver: "v1" }],
  },
  {
    name: "Passport (Data Model)", version: "v1",
    tasks: [
      { label: "Data model + API", start: "2026-02-06", end: "2026-02-18", ver: "v1" },
      { label: "Medication & Conditions inventory UI", start: "2026-02-15", end: "2026-02-28", ver: "v1" },
      { label: "Prescription records & Rx detail mgmt", start: "2026-03-01", end: "2026-03-20", ver: "v1.5" },
    ],
  },
  {
    name: "Meds Intake", version: "v1",
    tasks: [
      { label: "Manual entry + schedule generation", start: "2026-02-10", end: "2026-02-25", ver: "v1" },
      { label: "Pill bottle scanner (OCR / video)", start: "2026-03-01", end: "2026-03-25", ver: "v1.5" },
      { label: "Pharmacy / EHR import (if unblocked)", start: "2026-07-01", end: "2026-09-30", ver: "v2", blocked: true },
    ],
  },
  {
    name: "Reminders & Confirmation", version: "v1",
    tasks: [
      { label: "Reminder engine (from generated schedule)", start: "2026-02-18", end: "2026-02-28", ver: "v1" },
      { label: "Take / snooze / skip confirmation loop", start: "2026-02-22", end: "2026-02-28", ver: "v1" },
    ],
  },
  {
    name: "Firmware & Connectivity", version: "v1.5",
    tasks: [
      { label: "Arch sprint + BLE protocol co-spec", start: "2026-02-06", end: "2026-02-20", ver: "v1" },
      { label: "Job 1: Reminder loop on band", start: "2026-02-20", end: "2026-04-10", ver: "v1.5", note: "Blocked by chip selection" },
      { label: "Job 2: Fall detection", start: "2026-04-10", end: "2026-06-15", ver: "v1.5" },
      { label: "Job 3: Health monitoring", start: "2026-06-15", end: "2026-09-30", ver: "v2" },
    ],
  },
  {
    name: "Support Circle", version: "v1.5",
    tasks: [
      { label: "Add relatives + permissions", start: "2026-03-01", end: "2026-03-25", ver: "v1.5" },
      { label: "Shared schedule + passport access", start: "2026-03-20", end: "2026-04-10", ver: "v1.5" },
      { label: "Emergency / fall notifications", start: "2026-04-05", end: "2026-04-15", ver: "v1.5" },
      { label: "Weekly reports to circle", start: "2026-04-10", end: "2026-04-30", ver: "v1.5" },
    ],
  },
  {
    name: "Insights & Gamification", version: "v1.5",
    tasks: [
      { label: "Confirmation reporting", start: "2026-03-15", end: "2026-04-05", ver: "v1.5" },
      { label: "Vitals dashboards", start: "2026-04-15", end: "2026-05-15", ver: "v1.5" },
      { label: "Gamification (streaks, badges)", start: "2026-04-01", end: "2026-04-15", ver: "v1.5" },
    ],
  },
  {
    name: "AI Assistant", version: "v1.5",
    tasks: [
      { label: "Scope definition & prototyping", start: "2026-03-01", end: "2026-03-20", ver: "v1.5" },
      { label: "Pharmacy chat MVP", start: "2026-03-20", end: "2026-04-15", ver: "v1.5" },
      { label: "Accountability partner + suggestions", start: "2026-05-01", end: "2026-07-01", ver: "v2" },
    ],
  },
  {
    name: "Integrations & Data Import", version: "v2",
    tasks: [
      { label: "Pharmacy API connectors", start: "2026-07-01", end: "2026-08-31", ver: "v2", blocked: true },
      { label: "EHR connectors", start: "2026-08-01", end: "2026-09-30", ver: "v2", blocked: true },
      { label: "NFC pharmacy sync", start: "2026-08-15", end: "2026-09-30", ver: "v2", blocked: true },
    ],
  },
];

const hwLanes = [
  {
    name: "SoC & LTE Selection", version: "v1", phase: "proto",
    tasks: [
      { label: "LTE modem evaluation & selection", start: "2026-02-06", end: "2026-02-13", ver: "v1", note: "URGENT — gates PCB" },
      { label: "Nordic eval (parallel track — TBD)", start: "2026-02-10", end: "2026-04-01", ver: "v1.5", note: "SoC decision pending" },
    ],
  },
  {
    name: "PCB & Electrical", version: "v1", phase: "proto",
    tasks: [
      { label: "PCB completion (integrate LTE, final routing)", start: "2026-02-13", end: "2026-02-27", ver: "v1" },
      { label: "Design iteration — PCB v2 (if needed)", start: "2026-05-01", end: "2026-05-30", ver: "v1.5" },
    ],
  },
  {
    name: "Prototyping & Fabrication", version: "v1", phase: "proto",
    tasks: [
      { label: "PCBA proto run 1 (fab + assembly)", start: "2026-02-27", end: "2026-03-20", ver: "v1" },
    ],
  },
  {
    name: "EVT (Eng Validation)", version: "v1", phase: "proto",
    tasks: [
      { label: "Sensor validation, BLE range, LTE, battery life", start: "2026-03-20", end: "2026-05-01", ver: "v1" },
    ],
  },
  {
    name: "ID & Mechanical Integration", version: "v1", phase: "proto",
    tasks: [
      { label: "PCB into enclosure, antenna clearance, haptics", start: "2026-03-20", end: "2026-04-15", ver: "v1" },
    ],
  },
  {
    name: "CM & DFM", version: "v1.5", phase: "lrip",
    tasks: [
      { label: "CM selection finalization", start: "2026-04-15", end: "2026-05-15", ver: "v1.5" },
      { label: "DFM review & feedback integration", start: "2026-05-15", end: "2026-05-30", ver: "v1.5" },
    ],
  },
  {
    name: "LRIP Production", version: "v1.5", phase: "lrip",
    tasks: [
      { label: "Low rate initial production (50–200 units)", start: "2026-06-01", end: "2026-07-01", ver: "v1.5" },
    ],
  },
  {
    name: "Tooling", version: "v2", phase: "scale",
    tasks: [
      { label: "Injection molds (enclosure + band)", start: "2026-06-01", end: "2026-07-30", ver: "v2" },
    ],
  },
  {
    name: "DVT (Design Validation)", version: "v2", phase: "scale",
    tasks: [
      { label: "Reliability, drop, water, thermal testing", start: "2026-07-01", end: "2026-08-15", ver: "v2" },
    ],
  },
  {
    name: "Regulatory", version: "v2", phase: "scale",
    tasks: [
      { label: "FCC, BLE cert, LTE cert filing", start: "2026-07-15", end: "2026-09-15", ver: "v2" },
    ],
  },
  {
    name: "PVT & Mass Production", version: "v2", phase: "scale",
    tasks: [
      { label: "Pilot production run + yield optimization", start: "2026-09-15", end: "2026-10-15", ver: "v2" },
      { label: "Mass production ramp", start: "2026-10-15", end: "2026-10-31", ver: "v2" },
    ],
  },
];

const START = new Date("2026-02-01");
const END = new Date("2026-11-30");
const TOTAL_DAYS = (END - START) / (1000 * 60 * 60 * 24);
const TODAY = "2026-02-06";

function pct(s) { return ((new Date(s) - START) / (1000 * 60 * 60 * 24) / TOTAL_DAYS) * 100; }

const months = [];
let dd = new Date("2026-02-01");
while (dd <= END) { months.push(new Date(dd)); dd = new Date(dd.getFullYear(), dd.getMonth() + 1, 1); }

function MonthHeaders({ laneW }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #2d3348", position: "sticky", top: 0, zIndex: 5, background: "#161923" }}>
      <div style={{ width: laneW, minWidth: laneW, padding: "10px 16px", fontSize: 11, color: "#4b5563", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Swimlane</div>
      <div style={{ flex: 1, position: "relative", height: 36 }}>
        {months.map((m, i) => {
          const l = pct(m.toISOString().split("T")[0]);
          const n = i < months.length - 1 ? pct(months[i + 1].toISOString().split("T")[0]) : 100;
          return <div key={i} style={{ position: "absolute", left: `${l}%`, width: `${n - l}%`, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#94a3b8", fontWeight: 500, borderRight: "1px solid #2d3348" }}>{m.toLocaleString("en", { month: "short" })}</div>;
        })}
      </div>
    </div>
  );
}

function MilestoneRow({ items, showExt, laneW }) {
  const visible = items.filter(m => showExt || m.type === "internal");
  const sorted = visible.map(m => ({ ...m, pos: pct(m.date) })).sort((a, b) => a.pos - b.pos);
  const rows = [];
  sorted.forEach(m => {
    let placed = false;
    for (let r = 0; r < rows.length; r++) {
      const last = rows[r][rows[r].length - 1];
      if (m.pos - last.pos > 6) { rows[r].push(m); m._row = r; placed = true; break; }
    }
    if (!placed) { m._row = rows.length; rows.push([m]); }
  });
  const rowCount = Math.max(rows.length, 1);
  const ROW_H = 44;
  const totalH = 24 + rowCount * ROW_H;

  return (
    <div style={{ display: "flex", borderBottom: "2px solid #2d3348" }}>
      <div style={{ width: laneW, minWidth: laneW, padding: "10px 16px", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, background: "#13161f", borderRight: "1px solid #2d3348", display: "flex", alignItems: "center" }}>Milestones</div>
      <div style={{ flex: 1, position: "relative", height: totalH }}>
        {months.map((m, i) => <div key={i} style={{ position: "absolute", left: `${pct(m.toISOString().split("T")[0])}%`, top: 0, bottom: 0, width: 1, background: "#1e2231" }} />)}
        <div style={{ position: "absolute", left: `${pct(TODAY)}%`, top: 0, bottom: 0, width: 2, background: "#10b981", opacity: 0.4 }} />
        <div style={{ position: "absolute", left: `${pct(TODAY)}%`, top: 4, transform: "translateX(-50%)", fontSize: 10, color: "#10b981", fontWeight: 600, background: "#161923", padding: "1px 6px", borderRadius: 4, zIndex: 2 }}>TODAY</div>
        {sorted.map((m, i) => (
          <div key={i} style={{ position: "absolute", left: `${m.pos}%`, top: 20 + (m._row || 0) * ROW_H, transform: "translateX(-50%)" }}>
            <div style={{ width: m.type === "external" ? 10 : 12, height: m.type === "external" ? 10 : 12, borderRadius: m.type === "external" ? 2 : "50%", background: m.type === "external" ? "transparent" : m.color, border: `2px solid ${m.color}`, margin: "0 auto 3px" }} />
            <div style={{ fontSize: 9, color: m.color, fontWeight: 600, whiteSpace: "nowrap", textAlign: "center", opacity: m.type === "external" ? 0.7 : 1 }}>
              {m.label}<br /><span style={{ color: "#6b7280", fontWeight: 400 }}>{new Date(m.date).toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskRow({ lane, li, hover, setHover, viewMode, laneW, colorMap }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #1e2231", minHeight: 20 + lane.tasks.length * 32 }}>
      <div style={{ width: laneW, minWidth: laneW, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #2d3348", background: "#13161f" }}>
        <span>{lane.name}</span>
        <span style={{ fontSize: 10, color: (colorMap === "hw" && lane.phase ? HW_PHASES[lane.phase]?.color : VERSIONS[lane.version]?.color) || "#6b7280", fontWeight: 500, marginTop: 2 }}>
          {colorMap === "hw" && lane.phase ? HW_PHASES[lane.phase]?.label : `Target: ${lane.version}`}
        </span>
      </div>
      <div style={{ flex: 1, position: "relative", padding: "8px 0" }}>
        {months.map((m, i) => <div key={i} style={{ position: "absolute", left: `${pct(m.toISOString().split("T")[0])}%`, top: 0, bottom: 0, width: 1, background: "#1e2231" }} />)}
        <div style={{ position: "absolute", left: `${pct(TODAY)}%`, top: 0, bottom: 0, width: 2, background: "#10b981", opacity: 0.4, zIndex: 1 }} />
        {lane.tasks.map((task, ti) => {
          const left = pct(task.start);
          const width = pct(task.end) - pct(task.start);
          const verColor = (colorMap === "hw" && lane.phase ? HW_PHASES[lane.phase]?.color : VERSIONS[task.ver]?.color) || "#6b7280";
          const hk = `${li}-${ti}`;
          const isH = hover === hk;
          if (viewMode === "v1" && task.ver !== "v1") return null;
          if (viewMode === "v1.5" && task.ver === "v2") return null;
          return (
            <div key={ti} onMouseEnter={() => setHover(hk)} onMouseLeave={() => setHover(null)}
              style={{ position: "relative", height: 26, marginBottom: 4, marginLeft: `${left}%`, width: `${Math.max(width, 2)}%`, cursor: "default" }}>
              <div style={{
                height: "100%", borderRadius: 5,
                background: task.blocked ? `repeating-linear-gradient(45deg, ${verColor}22, ${verColor}22 3px, ${verColor}11 3px, ${verColor}11 7px)` : `${verColor}${isH ? "dd" : "99"}`,
                border: `1px solid ${task.blocked ? "#ef4444" : verColor}${isH ? "ff" : "66"}`,
                display: "flex", alignItems: "center", paddingLeft: 8, paddingRight: 8,
                transition: "all 0.15s ease", transform: isH ? "scaleY(1.12)" : "scaleY(1)",
              }}>
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>{task.label}</span>
              </div>
              {isH && (
                <div style={{ position: "absolute", top: -48, left: "50%", transform: "translateX(-50%)", background: "#1e2231", border: "1px solid #3d4660", borderRadius: 6, padding: "6px 12px", whiteSpace: "nowrap", zIndex: 10, fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{task.label}</span>
                  <span style={{ color: "#6b7280", marginLeft: 8 }}>
                    {new Date(task.start).toLocaleDateString("en", { month: "short", day: "numeric" })} → {new Date(task.end).toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </span>
                  {task.blocked && <span style={{ color: "#ef4444", marginLeft: 6 }}>⚠ Blocked</span>}
                  {task.note && <span style={{ color: "#f59e0b", marginLeft: 6 }}>⚠ {task.note}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionDivider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", background: "#13161f", borderBottom: "2px solid #2d3348", borderTop: "2px solid #2d3348", padding: "8px 16px", gap: 10 }}>
      <div style={{ width: 4, height: 20, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 13, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.5 }}>{label}</span>
    </div>
  );
}

export default function App() {
  const [hover, setHover] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [showExt, setShowExt] = useState(true);
  const [tab, setTab] = useState("combined");

  const LANE_W = 220;
  const CHART_MIN = 1800;

  const filterLanes = (lanes) => viewMode === "all" ? lanes : lanes.filter(s => {
    if (viewMode === "v1") return s.tasks.some(t => t.ver === "v1");
    if (viewMode === "v1.5") return s.tasks.some(t => t.ver === "v1" || t.ver === "v1.5");
    return true;
  });

  const combinedMilestones = [...swMilestones, ...hwMilestones];

  return (
    <div style={{ background: "#0f1117", color: "#e2e8f0", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5 }}>Rx360 • CY2026</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "4px 0 6px" }}>Product Development Roadmap</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Hardware & Software — Internal vs External timelines</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "2px solid #2d3348" }}>
          {[{ key: "combined", label: "Combined" }, { key: "sw", label: "Software" }, { key: "hw", label: "Hardware" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "10px 24px", border: "none", borderBottom: tab === t.key ? "2px solid #3b82f6" : "2px solid transparent",
              background: "transparent", color: tab === t.key ? "#e2e8f0" : "#6b7280",
              fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: -2,
              transition: "all 0.15s ease",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          {["all", "v1", "v1.5"].map(v => (
            <button key={v} onClick={() => setViewMode(v)} style={{
              padding: "5px 12px", borderRadius: 6, border: "1px solid",
              borderColor: viewMode === v ? "#3b82f6" : "#2d3348",
              background: viewMode === v ? "#1e3a5f" : "#181c2a",
              color: viewMode === v ? "#93c5fd" : "#94a3b8",
              cursor: "pointer", fontSize: 12, fontWeight: 500,
            }}>
              {v === "all" ? "All" : v.toUpperCase()}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, color: "#94a3b8" }}>
            <input type="checkbox" checked={showExt} onChange={() => setShowExt(!showExt)} style={{ accentColor: "#8b5cf6" }} />
            External dates
          </label>
        </div>

        {/* Legends */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
          {(tab !== "hw") && Object.entries(VERSIONS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: v.color, opacity: k === "v0.5" ? 0.5 : 0.85 }} />
              <span style={{ color: "#94a3b8" }}>{k}</span>
            </div>
          ))}
          {(tab !== "sw") && Object.entries(HW_PHASES).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: v.color, opacity: 0.85 }} />
              <span style={{ color: "#94a3b8" }}>{v.label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: "repeating-linear-gradient(45deg, #ef4444, #ef4444 2px, transparent 2px, transparent 5px)", border: "1px solid #ef4444" }} />
            <span style={{ color: "#94a3b8" }}>Blocked</span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: "#161923", borderRadius: 12, border: "1px solid #2d3348", overflowX: "auto" }}>
          <div style={{ minWidth: CHART_MIN }}>
            <MonthHeaders laneW={LANE_W} />

            {(tab === "sw" || tab === "combined") && (
              <>
                {tab === "combined" && <SectionDivider label="Software" color="#3b82f6" />}
                <MilestoneRow items={tab === "combined" ? combinedMilestones : swMilestones} showExt={showExt} laneW={LANE_W} />
                {filterLanes(swLanes).map((lane, li) => (
                  <TaskRow key={`sw-${li}`} lane={lane} li={`sw-${li}`} hover={hover} setHover={setHover} viewMode={viewMode} laneW={LANE_W} colorMap="sw" />
                ))}
              </>
            )}

            {(tab === "hw" || tab === "combined") && (
              <>
                {tab === "combined" && <SectionDivider label="Hardware" color="#14b8a6" />}
                {tab === "hw" && <MilestoneRow items={hwMilestones} showExt={showExt} laneW={LANE_W} />}
                {filterLanes(hwLanes).map((lane, li) => (
                  <TaskRow key={`hw-${li}`} lane={lane} li={`hw-${li}`} hover={hover} setHover={setHover} viewMode={viewMode} laneW={LANE_W} colorMap="hw" />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 16, padding: "12px 16px", background: "#1a1d2a", borderRadius: 8, border: "1px solid #2d3348" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", marginBottom: 6 }}>⚠ Key Risks & Blockers</div>
          <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
            <strong style={{ color: "#e2e8f0" }}>SoC Decision:</strong> Qualcomm (current) vs Nordic (eval) — dual-track approach under consideration. Decision pending.
            <br />
            <strong style={{ color: "#e2e8f0" }}>LTE Modem:</strong> Must be selected by Feb 13 to keep PCB on track. Cat-M1/NB-IoT likely.
            <br />
            <strong style={{ color: "#e2e8f0" }}>Firmware:</strong> Chip selection gates all firmware work beyond arch sprint.
            <br />
            <strong style={{ color: "#e2e8f0" }}>Integrations:</strong> Pharmacy & EHR connectors blocked by business development.
            <br />
            <strong style={{ color: "#e2e8f0" }}>Buffer policy:</strong> SW external dates carry 4-week buffer. ● = Internal, □ = External.
          </div>
        </div>
      </div>
    </div>
  );
}
