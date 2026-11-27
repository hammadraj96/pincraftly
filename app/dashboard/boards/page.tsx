import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function BoardsPage() {
  const supabase = await createClient();
  const { data: boards } = await supabase.from("boards").select("*");

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 6px" }}>
        Pinterest Boards ({boards?.length || 0})
      </h1>
      <p style={{ margin: "0 0 24px", color: "#64748B", fontSize: "14.5px" }}>
        Connected Pinterest boards synced with your PinCraftly workspace.
      </p>

      {boards && boards.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {boards.map((b) => (
            <div key={b.id} style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ background: "#FFF0F1", color: "#E60023", fontSize: "11px", fontWeight: 800, padding: "2px 7px", borderRadius: "5px" }}>
                  {b.privacy || "PUBLIC"}
                </span>
                <span style={{ fontSize: "12px", color: "#94A3B8" }}>ID: {b.id}</span>
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: 700, color: "#0F172A" }}>{b.name}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B", lineHeight: 1.4 }}>{b.description || "No description provided."}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "32px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#64748B" }}>No boards found. Connected boards will automatically show here.</p>
        </div>
      )}
    </div>
  );
}
