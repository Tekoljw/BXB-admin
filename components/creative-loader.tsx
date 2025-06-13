"use client"

import React from "react"

interface CreativeLoaderProps {
  size?: number
  variant?: "circle" | "triangle" | "rect"
  className?: string
}

export default function CreativeLoader({ 
  size = 44, 
  variant = "circle", 
  className = "" 
}: CreativeLoaderProps) {
  const loaderStyles = {
    "--path": "#00D4AA",
    "--dot": "#00D4AA", 
    "--duration": "3s",
    width: `${size}px`,
    height: `${size}px`,
    position: "relative" as const,
  }

  const triangleStyles = variant === "triangle" ? {
    width: `${Math.round(size * 1.09)}px`
  } : {}

  return (
    <div className={`creative-loader ${className}`}>
      <style jsx>{`
        .creative-loader {
          --path: #000000;
          --dot: #00D4AA;
          --duration: 3s;
          width: ${size}px;
          height: ${size}px;
          position: relative;
          display: inline-block;
          background: black;
          border-radius: 8px;
          padding: 8px;
          ${variant === "triangle" ? `width: ${Math.round(size * 1.09)}px;` : ""}
        }
        
        .creative-loader:before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: var(--dot);
          top: ${Math.round(size * 0.84)}px;
          left: ${variant === "triangle" ? Math.round(size * 0.48) : Math.round(size * 0.43)}px;
          transform: translate(${variant === "triangle" ? "-10px" : "-18px"}, -18px);
          animation: ${variant === "triangle" ? "dotTriangle" : variant === "rect" ? "dotRect" : "dotCircle"} var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        
        .creative-loader svg {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        .creative-loader svg rect,
        .creative-loader svg polygon,
        .creative-loader svg circle {
          fill: none;
          stroke: var(--path);
          stroke-width: 10px;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
        
        .creative-loader svg polygon {
          stroke-dasharray: 145 76 145 76;
          stroke-dashoffset: 0;
          animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        
        .creative-loader svg rect {
          stroke-dasharray: 192 64 192 64;
          stroke-dashoffset: 0;
          animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        
        .creative-loader svg circle {
          stroke-dasharray: 150 50 150 50;
          stroke-dashoffset: 75;
          animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        @keyframes pathTriangle {
          33% { stroke-dashoffset: 74; }
          66% { stroke-dashoffset: 147; }
          100% { stroke-dashoffset: 221; }
        }
        
        @keyframes dotTriangle {
          33% { transform: translate(0, 0); }
          66% { transform: translate(10px, -18px); }
          100% { transform: translate(-10px, -18px); }
        }
        
        @keyframes pathRect {
          25% { stroke-dashoffset: 64; }
          50% { stroke-dashoffset: 128; }
          75% { stroke-dashoffset: 192; }
          100% { stroke-dashoffset: 256; }
        }
        
        @keyframes dotRect {
          25% { transform: translate(0, 0); }
          50% { transform: translate(18px, -18px); }
          75% { transform: translate(0, -36px); }
          100% { transform: translate(-18px, -18px); }
        }
        
        @keyframes pathCircle {
          25% { stroke-dashoffset: 125; }
          50% { stroke-dashoffset: 175; }
          75% { stroke-dashoffset: 225; }
          100% { stroke-dashoffset: 275; }
        }
        
        @keyframes dotCircle {
          25% { transform: translate(0, 0); }
          50% { transform: translate(18px, -18px); }
          75% { transform: translate(0, -36px); }
          100% { transform: translate(-18px, -18px); }
        }
      `}</style>
      
      <svg viewBox="0 0 80 80">
        {variant === "circle" && <circle cx="40" cy="40" r="32" />}
        {variant === "triangle" && <polygon points="43 8 79 72 7 72" />}
        {variant === "rect" && <rect x="8" y="8" width="64" height="64" />}
      </svg>
    </div>
  )
}