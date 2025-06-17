interface TetherIconProps {
  className?: string
}

export default function TetherIcon({ className = "w-5 h-5" }: TetherIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top horizontal bar */}
      <rect x="2" y="2" width="20" height="6" fill="currentColor"/>
      
      {/* Vertical stem */}
      <rect x="8" y="2" width="8" height="20" fill="currentColor"/>
      
      {/* Central ellipse - outline only */}
      <ellipse 
        cx="12" 
        cy="12" 
        rx="10" 
        ry="4" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  )
}