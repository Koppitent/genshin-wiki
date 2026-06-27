"use client";

import { TierListDto } from "@/lib/tierlists/tierlist.schema";
import {
  getTierListOfficial,
  getTierLists,
} from "@/lib/tierlists/tierlistServiceClient";
import { useEffect, useState } from "react";
import TableList from "../TableList";
import TierListCreator from "./TierListCreator";

type Mode = "official" | "list" | "create" | "edit";

export default function TierListsClient() {
  const [tierLists, setTierLists] = useState<TierListDto[]>([]);
  const [mode, setMode] = useState<Mode>("official");
  const [selectedTierList, setSelectedTierList] = useState<TierListDto | null>(
    null,
  );

  useEffect(() => {
    loadOfficialTierList();
    loadTierLists();
  }, []);

  function loadTierLists() {
    getTierLists()
      .then((data) => {
        console.debug("Loading data: ", data);
        setTierLists(data);
      })
      .catch((error) => {
        console.error("Error fetching tier lists:", error);
      });
  }
  const [officialTierLists, setOfficialTierLists] =
    useState<TierListDto | null>(null);

  function loadOfficialTierList() {
    getTierListOfficial()
      .then((data) => {
        console.debug("Loading official tier list: ", data);
        setOfficialTierLists(data);
      })
      .catch((error) => {
        console.error("Error fetching official tier list:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {mode === "official" && (
        <div>
          <TierListCreator
            mode={"display"}
            tierList={officialTierLists || undefined}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
            onClick={() => setMode("create")}
          >
            Create your own tier list
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
            onClick={() => setMode("list")}
          >
            See your tier lists
          </button>
        </div>
      )}
      {mode === "list" && (
        <>
          <h1 className="text-2xl font-bold">Tier Lists</h1>
          <p className="text-gray-600">
            Explore and create tier lists for your favorite games.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setMode("create")}
          >
            Create New Tier List
          </button>
          <TableList
            items={tierLists}
            columns={[
              {
                name: "Title",
                render: (item) => item.title,
              },
              {
                name: "Visibility",
                render: (item) => item.visibility,
              },
              {
                name: "Actions",
                render: (item) => (
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => {
                        setSelectedTierList(item);
                        setMode("edit");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        // Handle delete action here
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
      {(mode === "create" || mode === "edit") && (
        <div>
          <TierListCreator
            mode={mode}
            tierList={selectedTierList || undefined}
          />
        </div>
      )}
    </div>
  );
}
