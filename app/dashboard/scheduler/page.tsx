import React from "react";
import { getSchedulesAction } from "./actions";
import SchedulerClient from "@/components/dashboard/SchedulerClient";

export const metadata = {
  title: "Pinterest Scheduler | PinCraftly",
  description: "Schedule, queue, and automate your Pinterest publishing calendar.",
};

export default async function SchedulerPage() {
  const result = await getSchedulesAction();

  return (
    <SchedulerClient
      initialSchedules={result.schedules || []}
      draftPins={result.draftPins || []}
      boards={result.boards || []}
    />
  );
}
