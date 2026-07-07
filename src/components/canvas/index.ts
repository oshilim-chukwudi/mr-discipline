import dynamic from "next/dynamic";

// No 'use client' here — dynamic() with ssr:false handles the client boundary.
// Each canvas file has its own 'use client' for the Three.js code inside it.
const EarthCanvas = dynamic(() => import("./Earth"), { ssr: false });
const ComputersCanvas = dynamic(() => import("./Computers"), { ssr: false });
const StarsCanvas = dynamic(() => import("./Stars"), { ssr: false });

export { EarthCanvas, ComputersCanvas, StarsCanvas };
