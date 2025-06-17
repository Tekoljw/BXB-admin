interface TetherIconProps {
  className?: string
}

export default function TetherIcon({ className = "w-5 h-5" }: TetherIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top horizontal bar */}
      <rect x="55" y="55" width="402" height="120" fill="currentColor"/>
      
      {/* Vertical stem extending down */}
      <rect x="200" y="55" width="112" height="402" fill="currentColor"/>
      
      {/* Horizontal ellipse through the middle */}
      <ellipse 
        cx="256" 
        cy="256" 
        rx="230" 
        ry="60" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="40"
      />
    </svg>
  )
}