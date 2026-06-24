export const elementIcons = {
  pyro: "/elements/pyro.webp",
  hydro: "/elements/hydro.webp",
  electro: "/elements/electro.webp",
  anemo: "/elements/anemo.webp",
  cryo: "/elements/cryo.webp",
  geo: "/elements/geo.webp",
  dendro: "/elements/dendro.webp",
  default: "/elements/hydro.webp",
} as const;

export type ElementKey = keyof typeof elementIcons;

export function getElementIcon(key: string) {
  return elementIcons[key as ElementKey] ?? elementIcons.default;
}