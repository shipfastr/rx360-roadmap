import { useState } from "react";

const VERSIONS = {
  "v0.5": { color: "#6b7280", label: "Shipped" },
  "v1": { color: "#3b82f6", label: "Core" },
  "v1.5": { color: "#8b5cf6", label: "Expansion" },
  "v2": { color: "#f59e0b", label: "Full Platform" },
};

const milestones = [
  { label: "v1 Internal", date: "2026-02-28", color: "#3b82f6", type: "internal" },
  { label: "v1 External", date: "2026-03-31", color: "#3b82f6", type: "external" },
  { label: "v1.5 Internal", date: "2026-04-15", color: "#8b5cf6", type: "internal" },
  { label: "v1.5 External", date: "2026-05-15", color: "#8b5cf6", type: "external" },
  { label: "v2 Placeholder", date: "2026-09-30", color: "#f59e0b", type: "internal" },
];

const swimlanes = [
  {
    name: "Auth & Onboarding",
    version: "v1",
    tasks: [
      { label: "User auth + onboarding flow", start: "2026-02-06", end: "2026-02-20", ver: "v1" },
      { label: "SSO / social login", start: "2026-03-15", end: "2026-04-05", ver: "v1.5" },
    ],
  },
  {
    name: "Passport (Data Model)",
    version: "v1",
    tasks: [
      { label: "Data model + API", start: "2026-02-06", end: "2026-02-18", ver: "v1" },
      { label: "Medication & Conditions inventory UI", start: "2026-02-15", end: "2026-02-28", ver: "v1" },
      { label: "Scripts inventory + enrichment", start: "2026-03-01", end: "2026-03-20", ver: "v1.5" },
    ],
  },
  {
    name: "Scheduling & Reminders",
    version: "v1",
    tasks: [
      { label: "Custom scheduler + pre-set alerts", start: "2026-02-10", end: "2026-02-25", ver: "v1" },
      { label: "Intake confirmation system", start: "2026-02-18", end: "2026-02-28", ver: "v1" },
      { label: "Advanced scheduling (recurring patterns)", start: "2026-03-10", end: "2026-04-05", ver: "v1.5" },
    ],
  },
  {
    name: "Meds Intake",
    version: "v1",
    tasks: [
      { label: "Manual entry", start: "2026-02-10", end: "2026-02-22", ver: "v1" },
      { label: "Pill bottle scanner (OCR)", start: "2026-03-01", end: "2026-03-25", ver: "v1.5" },
      { label: "Pharmacy/EHR import (if unblocked)", start: "2026-07-01", end: "2026-09-30", ver: "v2", blocked: true },
    ],
  },
  {
    name: "Firmware & Connectivity",
    version: "v1.5",
    tasks: [
      { label: "Arch sprint + BLE protocol co-spec", start: "2026-02-06", end: "2026-02-20", ver: "v1" },
      { label: "Job 1: Reminder loop on band", start: "2026-02-20", end: "2026-04-10", ver: "v1.5", note: "Blocked by chip selection" },
      { label: "Job 2: Fall detection", start: "2026-04-10", end: "2026-06-15", ver: "v1.5" },
      { label: "Job 3: Health monitoring", start: "2026-06-15", end: "2026-09-30", ver: "v2" },
    ],
  },
  {
    name: "Support Circle",
    version: "v1.5",
    tasks: [
      { label: "Add relatives + permissions", start: "2026-03-01", end: "2026-03-25", ver: "v1.5" },
      { label: "Shared schedule + passport access", start: "2026-03-20", end: "2026-04-10", ver: "v1.5" },
      { label: "Emergency/fall notifications", start: "2026-04-05", end: "2026-04-15", ver: "v1.5" },
      { label: "Weekly reports to circle", start: "2026-04-10", end: "2026-04-30", ver: "v1.5" },
    ],
  },
  {
    name: "Insights & Gamification",
    version: "v1.5",
    tasks: [
      { label: "Confirmation reporting", start: "2026-03-15", end: "2026-04-05", ver: "v1.5" },
      { label: "Vitals dashboards", start: "2026-04-15", end: "2026-05-15", ver: "v1.5" },
      { label: "Gamification (streaks, badges)", start: "2026-04-01", end: "2026-04-15", ver: "v1.5" },
    ],
  },
  {
    name: "AI Assistant",
    version: "v1.5",
    tasks: [
      { label: "Scope definition & prototyping", start: "2026-03-01", end: "2026-03-20", ver: "v1.5" },
      { label: "Pharmacy chat MVP", start: "2026-03-20", end: "2026-04-15", ver: "v1.5" },
      { label: "Accountability partner + suggestions", start: "2026-05-01", end: "2026-07-01", ver: "v2" },
    ],
  },
  {
    name: "Integrations & Data Import",
    version: "v2",
    tasks: [
      { label: "Pharmacy API connectors", start: "2026-07-01", end: "2026-08-31", ver: "v2", blocked: true },
      { label: "EHR connectors", start: "2026-08-01", end: "2026-09-30", ver: "v2", blocked: true },
      { label: "NFC pharmacy sync", start: "2026-08-15", end: "2026-09-30", ver: "v2", blocked: true },
    ],
  },
];

const START = new Date("2026-02-01");
const END = new Date("2026-10-31");
const TOTAL_DAYS = (END - START) / (1000 * 60 * 60 * 24);

function dayOffset(dateStr) {
  return (new Date(dateStr) - START) / (1000 * 60 * 60 * 24);
}

function pct(dateStr) {
  return (dayOffset(dateStr) / TOTAL_DAYS) * 100;
}

const months = [];
let d = new Date("2026-02-01");
while (d <= END) {
  months.push(new Date(d));
  d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

const TODAY = "2026-02-06";

export default function App() {
  const [hover, setHover] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [showExternal, setShowExternal] = useState(true);

  const filtered = viewMode === "all" ? swimlanes : swimlanes.filter(s => {
    if (viewMode === "v1") return s.tasks.some(t => t.ver === "v1");
    if (viewMode === "v1.5") return s.tasks.some(t => t.ver === "v1" || t.ver === "v1.5");
    return true;
  });

  return (
    <div style={{ background: "#0f1117", color: "#e2e8f0", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5 }}>Rx360 • CY2026</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "4px 0 6px" }}>Software Development Roadmap</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Internal (aggressive) vs External timelines • 4-week buffer</p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {["all", "v1", "v1.5"].map(v => (
            <button key={v} onClick={() => setViewMode(v)} style={{
              padding: "6px 14px", borderRadius: 6, border: "1px solid",
              borderColor: viewMode === v ? "#3b82f6" : "#2d3348",
              background: viewMode === v ? "#1e3a5f" : "#181c2a",
              color: viewMode === v ? "#93c5fd" : "#94a3b8",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
            }}>
              {v === "all" ? "All Versions" : v.toUpperCase() + " Scope"}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#94a3b8" }}>
            <input type="checkbox" checked={showExternal} onChange={() => setShowExternal(!showExternal)}
              style={{ accentColor: "#8b5cf6" }} />
            Show external dates
          </label>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          {Object.entries(VERSIONS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: v.color, opacity: k === "v0.5" ? 0.5 : 0.85 }} />
              <span style={{ color: "#94a3b8" }}>{k} — {v.label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "repeating-linear-gradient(45deg, #ef4444, #ef4444 2px, transparent 2px, transparent 6px)", border: "1px solid #ef4444" }} />
            <span style={{ color: "#94a3b8" }}>Blocked (biz dev)</span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: "#161923", borderRadius: 12, border: "1px solid #2d3348", overflowX: "auto" }}>
        <div style={{ minWidth: 1800 }}>
          {/* Month headers */}
          <div style={{ display: "flex", borderBottom: "1px solid #2d3348" }}>
            <div style={{ width: 200, minWidth: 200, padding: "10px 16px", fontSize: 11, color: "#4b5563", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Swimlane
            </div>
            <div style={{ flex: 1, position: "relative", height: 36 }}>
              {months.map((m, i) => {
                const left = pct(m.toISOString().split("T")[0]);
                const next = i < months.length - 1 ? pct(months[i + 1].toISOString().split("T")[0]) : 100;
                return (
                  <div key={i} style={{
                    position: "absolute", left: `${left}%`, width: `${next - left}%`,
                    height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "#94a3b8", fontWeight: 500,
                    borderRight: "1px solid #2d3348",
                  }}>
                    {m.toLocaleString("en", { month: "short" })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone row - TOP */}
          <div style={{ display: "flex", borderBottom: "2px solid #2d3348" }}>
            <div style={{
              width: 200, minWidth: 200, padding: "10px 16px", fontSize: 12, fontWeight: 700,
              color: "#6b7280", textTransform: "uppercase", letterSpacing: 1,
              background: "#13161f", borderRight: "1px solid #2d3348",
            }}>
              Milestones
            </div>
            <div style={{ flex: 1, position: "relative", height: 52 }}>
              {months.map((m, i) => (
                <div key={i} style={{
                  position: "absolute", left: `${pct(m.toISOString().split("T")[0])}%`,
                  top: 0, bottom: 0, width: 1, background: "#1e2231",
                }} />
              ))}
              <div style={{
                position: "absolute", left: `${pct(TODAY)}%`,
                top: 0, bottom: 0, width: 2, background: "#10b981", opacity: 0.4,
              }} />
              <div style={{
                position: "absolute", left: `${pct(TODAY)}%`, top: 4,
                transform: "translateX(-50%)", fontSize: 10, color: "#10b981", fontWeight: 600,
                background: "#161923", padding: "1px 6px", borderRadius: 4,
              }}>TODAY</div>
              {milestones.filter(m => showExternal || m.type === "internal").map((m, i) => (
                <div key={i} style={{ position: "absolute", left: `${pct(m.date)}%`, top: 20, transform: "translateX(-50%)" }}>
                  <div style={{
                    width: m.type === "external" ? 10 : 12,
                    height: m.type === "external" ? 10 : 12,
                    borderRadius: m.type === "external" ? 2 : "50%",
                    background: m.type === "external" ? "transparent" : m.color,
                    border: `2px solid ${m.color}`,
                    margin: "0 auto 3px",
                  }} />
                  <div style={{
                    fontSize: 9, color: m.color, fontWeight: 600, whiteSpace: "nowrap",
                    textAlign: "center", opacity: m.type === "external" ? 0.7 : 1,
                  }}>
                    {m.label}
                    <br />
                    <span style={{ color: "#6b7280", fontWeight: 400 }}>
                      {new Date(m.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {filtered.map((lane, li) => (
            <div key={li} style={{ display: "flex", borderBottom: "1px solid #1e2231", minHeight: 28 + lane.tasks.length * 28 }}>
              <div style={{
                width: 200, minWidth: 200, padding: "10px 16px", fontSize: 13, fontWeight: 600,
                color: "#e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center",
                borderRight: "1px solid #2d3348", background: "#13161f",
              }}>
                <span>{lane.name}</span>
                <span style={{ fontSize: 10, color: VERSIONS[lane.version]?.color || "#6b7280", fontWeight: 500, marginTop: 2 }}>
                  Target: {lane.version}
                </span>
              </div>
              <div style={{ flex: 1, position: "relative", padding: "6px 0" }}>
                {/* Grid lines */}
                {months.map((m, i) => (
                  <div key={i} style={{
                    position: "absolute", left: `${pct(m.toISOString().split("T")[0])}%`,
                    top: 0, bottom: 0, width: 1, background: "#1e2231",
                  }} />
                ))}
                {/* Today line */}
                <div style={{
                  position: "absolute", left: `${pct(TODAY)}%`,
                  top: 0, bottom: 0, width: 2, background: "#10b981", opacity: 0.4, zIndex: 1,
                }} />
                {/* Tasks */}
                {lane.tasks.map((task, ti) => {
                  const left = pct(task.start);
                  const width = pct(task.end) - pct(task.start);
                  const verColor = VERSIONS[task.ver]?.color || "#6b7280";
                  const isHovered = hover === `${li}-${ti}`;
                  if (viewMode === "v1" && task.ver !== "v1") return null;
                  if (viewMode === "v1.5" && task.ver === "v2") return null;
                  return (
                    <div key={ti}
                      onMouseEnter={() => setHover(`${li}-${ti}`)}
                      onMouseLeave={() => setHover(null)}
                      style={{
                        position: "relative", height: 24, marginBottom: 4, marginLeft: `${left}%`,
                        width: `${Math.max(width, 1.5)}%`, cursor: "default",
                      }}>
                      <div style={{
                        height: "100%", borderRadius: 5,
                        background: task.blocked
                          ? `repeating-linear-gradient(45deg, ${verColor}22, ${verColor}22 3px, ${verColor}11 3px, ${verColor}11 7px)`
                          : `${verColor}${isHovered ? "dd" : "99"}`,
                        border: `1px solid ${task.blocked ? "#ef4444" : verColor}${isHovered ? "ff" : "66"}`,
                        display: "flex", alignItems: "center", paddingLeft: 8,
                        transition: "all 0.15s ease",
                        transform: isHovered ? "scaleY(1.15)" : "scaleY(1)",
                      }}>
                        <span style={{
                          fontSize: 11, color: "#fff", fontWeight: 500,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                        }}>
                          {task.label}
                        </span>
                      </div>
                      {isHovered && (
                        <div style={{
                          position: "absolute", top: -44, left: "50%", transform: "translateX(-50%)",
                          background: "#1e2231", border: "1px solid #3d4660", borderRadius: 6,
                          padding: "6px 10px", whiteSpace: "nowrap", zIndex: 10, fontSize: 11,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        }}>
                          <span style={{ color: "#e2e8f0" }}>{task.label}</span>
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
          ))}
        </div>
        </div>

        {/* Footer notes */}
        <div style={{ marginTop: 16, padding: "12px 16px", background: "#1a1d2a", borderRadius: 8, border: "1px solid #2d3348" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", marginBottom: 6 }}>⚠ Key Risks & Blockers</div>
          <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
            <strong style={{ color: "#e2e8f0" }}>Firmware:</strong> Chip/SoC selection gates all firmware work beyond arch sprint. Must be decided by mid-Feb.
            <br />
            <strong style={{ color: "#e2e8f0" }}>Integrations:</strong> Pharmacy & EHR connectors blocked by business development. Dates are placeholders.
            <br />
            <strong style={{ color: "#e2e8f0" }}>AI Assistant:</strong> Scope TBD — prototyping starts in March, full feature set depends on passport data maturity.
            <br />
            <strong style={{ color: "#e2e8f0" }}>Buffer policy:</strong> All external dates carry a 4-week buffer from internal targets. ● = Internal milestone, □ = External milestone.
          </div>
        </div>
      </div>
    </div>
  );
}
