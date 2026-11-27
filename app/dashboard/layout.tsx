import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Dashboard | PinCraftly",
  description: "Manage your Pinterest pins, automation schedules, and blog connections.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Attempt to fetch user profile, fallback gracefully if table doesn't exist
  let profile = {
    id: user.id,
    email: user.email || "",
    plan: "Starter",
  };

  try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileData) {
      profile = {
        ...profile,
        ...profileData,
        plan: profileData.plan || "Starter",
      };
    }
  } catch (err) {
    // If profiles table isn't present, starter plan is safely assumed
  }

  return (
    <DashboardShell
      user={{ id: user.id, email: user.email }}
      profile={profile}
    >
      {children}
    </DashboardShell>
  );
}
