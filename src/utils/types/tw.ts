export type Hundred = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color =
  | "bg"
  | "fg"
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "success"
  | "warning"
  | "error";

export type Size =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export const weights = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const;
export type Weight = (typeof weights)[number];

export type Tag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type ColorEnding = Color | `${Color}-${Hundred}`;

export type TwColor = `text-${ColorEnding}`;

export type TwSize = `text-${Size}`;

export type TwWeight = `font-${Weight}`;
