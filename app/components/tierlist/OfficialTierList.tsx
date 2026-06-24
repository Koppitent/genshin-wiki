import { TierListDto } from "@/lib/tierlists/tierlist.schema";
import { getTierListOfficial } from "@/lib/tierlists/tierlistServiceClient";
import { useEffect, useState } from "react";
import DraggableCharacter from "./DraggableCharacter";

export default function OfficialTierList() {
  const [officialTierLists, setOfficialTierLists] =
    useState<TierListDto | null>(null);

  useEffect(() => {
    loadOfficialTierList();
  }, []);

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
    <>
    </>
  );
}
