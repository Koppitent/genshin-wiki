import { getDailyCharacter } from "@/lib/dailyCharachter";
import prisma from "@/lib/prisma";

type CharacterResponse = {
	won: boolean;
	regionCorrect: boolean;
	elementCorrect: boolean;
	weaponTypeCorrect: boolean;
	rarityCorrect: boolean;
	versionCorrect: number; // 0 = correct version, 1 = higher version, -1 = lower version

	guess: {
		characterUrl: string;
		region: string | null;
		element: string;
		weaponType: string;
		rarity: number;
		releaseVersion: number;
		regionUrl: string | null;
	};
}

export async function POST(request: Request) {
	 const body = await request.json();

  if(!body.id) {
		return new Response("ID is required", { status: 400 });
	}

	const chosenCharacter = await prisma.character.findFirst({
		where: {
			id: body.id,
		},
		include: {
			weaponType: true,
			region: true,
		},
	});

	if(!chosenCharacter) {
		return new Response("Character not found", { status: 404 });
	}

	const dailyCharacter = await getDailyCharacter();

	const response: CharacterResponse = {
		won: chosenCharacter.id === dailyCharacter.id,
		regionCorrect: chosenCharacter.regionId === dailyCharacter.regionId,
		elementCorrect: chosenCharacter.element === dailyCharacter.element,
		weaponTypeCorrect: chosenCharacter.weaponTypeId === dailyCharacter.weaponTypeId,
		rarityCorrect: chosenCharacter.rarity === dailyCharacter.rarity,
		versionCorrect: chosenCharacter.releaseVersion === dailyCharacter.releaseVersion ? 0 : (chosenCharacter.releaseVersion > dailyCharacter.releaseVersion ? 1 : -1),
		guess: {
			region: chosenCharacter.region ? chosenCharacter.region.name : null,
			element: chosenCharacter.element,
			weaponType: chosenCharacter.weaponType.name,
			rarity: chosenCharacter.rarity,
			releaseVersion: chosenCharacter.releaseVersion,
			regionUrl: chosenCharacter.region ? chosenCharacter.region.imageUrl : null,
			characterUrl: chosenCharacter.imageUrl,
		}
	};

	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});

}
