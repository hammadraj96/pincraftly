import React from "react";

export default function AnalyticsPage() {
  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 6px" }}>
        Performance Analytics
      </h1>
      <p style={{ margin: "0 0 24px", color: "#64748B", fontSize: "14.5px" }}>
        Track pin impressions, outbound clicks, and save rates across your boards.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "20px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Monthly Impressions</span>
          <h2 style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: 800, color: "#0F172A" }}>24.8K</h2>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "20px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Outbound Clicks</span>
          <h2 style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: 800, color: "#0F172A" }}>1,420</h2>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "20px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Pin Saves</span>
          <h2 style={{ margin: "8px 0 0", fontSize: "28px", fontWeight: 800, color: "#0F172A" }}>389</h2>
        </div>
      </div>
    </div>
  );
}
