import _logo from "./logo.svg";
import _backend from "./backend.png";
import _creator from "./creator.png";
import _mobile from "./mobile.png";
import _web from "./web.png";
import _github from "./github.png";
import _menu from "./menu.svg";
import _close from "./close.svg";

import _css from "./tech/css.png";
import _docker from "./tech/docker.png";
import _figma from "./tech/figma.png";
import _git from "./tech/git.png";
import _html from "./tech/html.png";
import _javascript from "./tech/javascript.png";
import _mongodb from "./tech/mongodb.png";
import _nodejs from "./tech/nodejs.png";
import _reactjs from "./tech/reactjs.png";
import _redux from "./tech/redux.png";
import _tailwind from "./tech/tailwind.png";
import _typescript from "./tech/typescript.png";
import _threejs from "./tech/threejs.svg";

import _carrent from "./carrent.png";
import _jobit from "./jobit.png";
import _tripguide from "./tripguide.png";

// Next.js returns StaticImageData objects for PNG/JPG imports ({ src, width, height }).
// SVGs come through as plain URL strings. This normaliser handles both.
const url = (img: { src: string } | string): string =>
  typeof img === "string" ? img : img.src;

export const logo = url(_logo as { src: string } | string);
export const backend = url(_backend as { src: string } | string);
export const creator = url(_creator as { src: string } | string);
export const mobile = url(_mobile as { src: string } | string);
export const web = url(_web as { src: string } | string);
export const github = url(_github as { src: string } | string);
export const menu = url(_menu as { src: string } | string);
export const close = url(_close as { src: string } | string);

export const css = url(_css as { src: string } | string);
export const docker = url(_docker as { src: string } | string);
export const figma = url(_figma as { src: string } | string);
export const git = url(_git as { src: string } | string);
export const html = url(_html as { src: string } | string);
export const javascript = url(_javascript as { src: string } | string);
export const mongodb = url(_mongodb as { src: string } | string);
export const nodejs = url(_nodejs as { src: string } | string);
export const reactjs = url(_reactjs as { src: string } | string);
export const redux = url(_redux as { src: string } | string);
export const tailwind = url(_tailwind as { src: string } | string);
export const typescript = url(_typescript as { src: string } | string);
export const threejs = url(_threejs as { src: string } | string);

export const carrent = url(_carrent as { src: string } | string);
export const jobit = url(_jobit as { src: string } | string);
export const tripguide = url(_tripguide as { src: string } | string);
