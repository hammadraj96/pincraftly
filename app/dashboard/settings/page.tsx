import React from "react";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 6px" }}>
        Account Settings
      </h1>
      <p style={{ margin: "0 0 28px", color: "#64748B", fontSize: "14.5px" }}>
        Manage your profile, active subscription plan, and linked websites.
      </p>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748B", marginBottom: "4px" }}>
            Account Email
          </label>
          <input
            type="text"
            readOnly
            value={user?.email || ""}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#0F172A", fontWeight: 600 }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748B", marginBottom: "4px" }}>
            Current Plan
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ background: "#FFF0F1", color: "#E60023", fontSize: "13px", fontWeight: 800, padding: "4px 10px", borderRadius: "6px" }}>
              Starter Plan
            </span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              Full access to AI Pin Studio &amp; Supabase Storage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
