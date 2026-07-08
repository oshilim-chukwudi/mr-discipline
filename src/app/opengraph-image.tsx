import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mr. Discipline — JumpStart program, 1-on-1 coaching, and discipline systems from Chukwudi Oshilim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 78% 50%, rgba(220,38,38,0.35) 0%, rgba(10,10,10,0) 60%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#dc2626",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Mr. Discipline
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#ffffff",
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.05,
          }}
        >
          Systems over motivation.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "rgba(255,255,255,0.6)",
            fontSize: 34,
            fontWeight: 500,
          }}
        >
          JumpStart program, 1-on-1 coaching &amp; discipline systems
        </div>
      </div>
    ),
    { ...size }
  );
}
