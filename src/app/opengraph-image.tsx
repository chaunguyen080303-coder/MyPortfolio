import { ImageResponse } from "next/og";
import { getContent } from "@/data";

export const alt = "Full-Stack Web Developer available for freelance work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  const content = getContent("en");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1220",
        color: "#e2e8f0",
        padding: "72px",
      }}
    >
      <div style={{ fontSize: 28, color: "#5eead4" }}>{content.ui.available}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>{content.profile.title}</div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#94a3b8", maxWidth: 900 }}>
          {content.profile.tagline}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
