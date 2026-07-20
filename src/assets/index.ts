import _menu from "./menu.svg";
import _close from "./close.svg";

// Next.js returns StaticImageData objects for PNG/JPG imports ({ src, width, height }).
// SVGs come through as plain URL strings. This normaliser handles both.
const url = (img: { src: string } | string): string =>
  typeof img === "string" ? img : img.src;

export const menu = url(_menu as { src: string } | string);
export const close = url(_close as { src: string } | string);
