import z from "zod";

export const TierEnum = z.enum(["SS", "S", "A", "B", "C", "D", "E", "F"]);
export const TierVisibilityEnum = z.enum(["PUBLIC", "PRIVATE", "UNLISTED", "OFFICIAL"]);

export const TierListEntrySchema = z.object({
  characterId: z.cuid2(),
  tier: TierEnum,
  position: z.int().nonnegative(),
});

export const CreateTierListSchema = z.object({
  title: z.string().min(1).max(100),
  visibility: TierVisibilityEnum,
  entries: z.array(TierListEntrySchema),
});

export const UpdateTierListSchema = z.object({
	id: z.cuid2(),
  title: z.string().min(1).max(100).optional(),
  visibility: TierVisibilityEnum.optional(),
  entries: z.array(TierListEntrySchema).optional(),
});

export const TierListDtoSchema = z.object({
  id: z.cuid2(),
  title: z.string().min(1).max(100),
  visibility: TierVisibilityEnum,
  entries: z.array(TierListEntrySchema),
});

export type CreateTierListInput = z.infer<typeof CreateTierListSchema>;
export type UpdateTierListInput = z.infer<typeof UpdateTierListSchema>;
export type TierListDto = z.infer<typeof TierListDtoSchema>;
