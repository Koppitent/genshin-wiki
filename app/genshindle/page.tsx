"use client";

import { elementIcons } from "@/lib/elements";
import { weaponIcons } from "@/lib/weapons";
import { ChevronDown, MoveDown, MoveUp, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Character = {
  id: string;
  name: string;
  imageUrl: string;
};

type GuessResult = {
  won: boolean;
  regionCorrect: boolean;
  elementCorrect: boolean;
  weaponTypeCorrect: boolean;
  rarityCorrect: boolean;
  versionCorrect: number;

  guess: {
		characterUrl: string;
    region: string | null;
    regionUrl: string | null;
    element: string;
    weaponType: string;
    rarity: number;
    releaseVersion: number;
  };
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getGameState() {
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith("genshindle="))
    ?.split("=")[1];

  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

function setGameState(state: any) {
  document.cookie = `genshindle=${encodeURIComponent(
    JSON.stringify(state),
  )}; path=/; max-age=31536000`;
}

export default function GenshindlePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filterText, setFilterText] = useState("");

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const [open, setOpen] = useState(false);

  const [tries, setTries] = useState(0);
  const [results, setResults] = useState<
    (GuessResult & { character: Character })[]
  >([]);

  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const MAX_TRIES = 5;

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/characters");
      const data = await res.json();
      setCharacters(data);
    }

    load();
  }, []);

  useEffect(() => {
    const state = getGameState();
    const today = getToday();

    if (!state || state.date !== today) {
      setGameState({ date: today, tries: 0, results: [], won: false });
      setTries(0);
      setResults([]);
      setDisabled(false);
      setWon(false);
    } else {
      setTries(state.tries);
      setResults(state.results || []);
      setWon(state.won || false);
      setDisabled(state.tries >= MAX_TRIES || state.won);
    }
  }, []);

  async function guessInstant(char: Character) {
    setFilterText("");

    const state = getGameState();
    const today = getToday();
    const current = tries;
		console.log("Current triess", state?.tries);
		

    if (current >= MAX_TRIES || state?.won) {
      setDisabled(true);
      return;
    }

    const res = await fetch("/api/genshindle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: char.id }),
    });

    const data: GuessResult = await res.json();

    const newResult = {
      ...data,
    };

    const isWon = data.won;

    const newState = {
      date: today,
      tries: current + 1,
      results: [newResult, ...(state?.results ?? [])],
      won: isWon || state?.won || false,
    };

		console.log("new state", newState.tries);
		
    setGameState(newState);

    setTries(newState.tries);
    setResults(newState.results);
    setWon(newState.won);

    setOpen(false);

    if (newState.tries >= MAX_TRIES || newState.won) {
      setDisabled(true);
    }
  }

  function resetGame() {
    document.cookie =
      "genshindle=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    setTries(0);
    setResults([]);
    setDisabled(false);
    setWon(false);
    setFilterText("");
    setOpen(false);
  }

  return (
    <div className="p-4 w-[60%] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daily Genshindle</h1>

      {/* INPUT */}
      <div className="mb-4 relative ">
        <input
          className="p-2 w-full outline-none bg-gray-900 text-white rounded focus:ring-2"
          onChange={(e) => setFilterText(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
          disabled={disabled || won}
          value={filterText}
        />
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2" />

        {open && !disabled && !won && (
          <div className="absolute z-10 w-full bg-gray-800 max-h-60 overflow-y-auto">
            {filteredCharacters.map((char) => (
              <div
                key={char.id}
                onClick={() => guessInstant(char)}
                className="flex items-center gap-3 p-2 hover:bg-gray-900 cursor-pointer"
              >
                <img
                  src={char.imageUrl}
                  className="w-8 h-8 rounded"
                  alt={char.name}
                />
                <span>{char.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mb-4">
        Tries: {tries} / {MAX_TRIES}
      </p>

      {won && (
        <p className="text-green-500 mb-4 font-bold">
          You guessed correctly 🎉
        </p>
      )}

      {disabled && !won && (
        <p className="text-red-500 mb-4">You used all tries today.</p>
      )}

      {/* HISTORY */}
      <div className="w-full mt-4 text-sm">
        <div className="grid grid-cols-[15%_15%_15%_15%_15%_25%] font-bold border-b border-gray-500 text-center">
          <div className="p-2">Image</div>
          <div className="p-2">Region</div>
          <div className="p-2">Element</div>
          <div className="p-2">Weapon</div>
          <div className="p-2">Rarity</div>
          <div className="p-2">Version</div>
        </div>

        <div className="flex flex-col">
          {results.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[15%_15%_15%_15%_15%_25%] text-center border-b border-2 border-gray-500 overflow-hidden"
            >
              <div className="flex items-center justify-center h-[96px] bg-purple-500 border-r border-l border-gray-500 ">
                <img
                  src={r.guess.characterUrl}
                  className="w-[6rem] h-[6rem]"
                  alt=""
                />
              </div>

              <div
                className={`flex items-center justify-center h-[96px] border-r border-gray-500 ${
                  r.regionCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >

								{r.guess.regionUrl ? (
									<img
										src={r.guess.regionUrl}
										className="w-[6rem] h-[6rem]"
										alt=""
									/>
								) : (
									<span>Unknown Region</span>
								)}
              </div>

              <div
                className={`flex items-center justify-center h-[96px] border-r border-gray-500 ${
                  r.elementCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Image
                  src={
                    elementIcons[r.guess.element as keyof typeof elementIcons]
                  }
                  alt={r.guess.element}
                  width={80}
                  height={80}
                />
              </div>

              <div
                className={`flex items-center justify-center h-[96px] border-r border-gray-500 ${
                  r.weaponTypeCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Image
                  src={
                    weaponIcons[
                      r.guess.weaponType.toLowerCase() as keyof typeof weaponIcons
                    ]
                  }
                  alt="weapon"
                  width={80}
                  height={80}
                />
              </div>

              <div
                className={`flex items-center justify-center h-[96px] border-r border-gray-500 ${
                  r.rarityCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span className="font-bold text-lg">{r.guess.rarity}</span>
                <Star size={18} fill="#FFD700" color="#FFD700" />
              </div>

              <div
                className={`flex items-center justify-center h-[96px] border-r border-gray-500 ${
                  r.versionCorrect === 0 ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span className="font-bold">
                  v{r.guess.releaseVersion ?? "?"}
                </span>

                {r.versionCorrect > 0 && <MoveUp size={16} />}
                {r.versionCorrect < 0 && <MoveDown size={16} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESET */}
      <button
        onClick={resetGame}
        className="mt-4 px-3 py-1 rounded bg-red-500 text-white"
      >
        Debug Reset Game
      </button>
    </div>
  );
}
