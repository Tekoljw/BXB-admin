import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Cryptocurrency Trading Dashboard"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation - reusing the same design for Twitter
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(135deg, #13C2A3 0%, #0891b2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "white",
      }}
    >
      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "72px", fontWeight: "bold", marginBottom: "20px" }}>💰 Crypto Dashboard</div>
        <div style={{ fontSize: "32px", opacity: 0.9 }}>Modern cryptocurrency trading platform</div>
      </div>
    </div>,
    { ...size },
  )
}
