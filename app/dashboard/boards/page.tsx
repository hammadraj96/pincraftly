import React from "react";
import { getBoardsAction } from "./actions";
import BoardsClient from "@/components/dashboard/BoardsClient";

export const metadata = {
  title: "Pinterest Boards | PinCraftly",
  description: "Create, view, manage, and organize your Pinterest boards.",
};

export default async function BoardsPage() {
  const result = await getBoardsAction();

  return <BoardsClient initialBoards={result.boards || []} />;
}
