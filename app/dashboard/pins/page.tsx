import React from "react";
import { getPinsAction } from "./actions";
import MyPinsClient from "@/components/dashboard/MyPinsClient";

export const metadata = {
  title: "My Pins | PinCraftly",
  description: "View, filter, edit, schedule, and manage your Pinterest pin drafts.",
};

export default async function MyPinsPage() {
  const result = await getPinsAction();

  return (
    <MyPinsClient
      initialPins={result.pins || []}
      boards={result.boards || []}
    />
  );
}
