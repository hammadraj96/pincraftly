import React from "react";
import Link from "next/link";

export default function SchedulerPage() {
  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 6px" }}>
        Smart Scheduler
      </h1>
      <p style={{ margin: "0 0 24px", color: "#64748B", fontSize: "14.5px" }}>
        Queue and automate your Pinterest publishing frequency with safe intervals.
      </p>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "40px", textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#FFF0F1", color: "#E60023", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700 }}>Pinterest Scheduler Ready</h3>
        <p style={{ margin: "0 0 20px", color: "#64748B", fontSize: "14px", maxWidth: "440px", marginInline: "auto" }}>
          Auto-spacing interval is set to every 3 hours during peak Pinterest traffic hours.
        </p>
        <Link href="/dashboard/create" style={{ display: "inline-flex", padding: "10px 20px", borderRadius: "10px", background: "#E60023", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "14px" }}>
          Generate Pins to Schedule
        </Link>
      </div>
    </div>
  );
}
