import { ApiError } from "next/dist/server/api-utils";
import { CreateTierListInput, TierListDto, TierListDtoSchema, UpdateTierListInput } from "./tierlist.schema";
import z from "zod";

export async function getTierLists(): Promise<TierListDto[]> {
  const res = await fetch("/api/tierlists");

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json?.message ?? "Failed to fetch tier lists",
    );
  }

  return z.array(TierListDtoSchema).parse(json);
}

export async function createTierList(tierList: CreateTierListInput): Promise<TierListDto> {
  const res = await fetch("/api/tierlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tierList),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json?.message ?? "Failed to create tier list",
    );
  }

  return TierListDtoSchema.parse(json);
}

export async function updateTierList(tierList: UpdateTierListInput): Promise<TierListDto> {
  const res = await fetch("/api/tierlists", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tierList),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json?.message ?? "Failed to update tier list",
    );
  }

  return TierListDtoSchema.parse(json);
}
