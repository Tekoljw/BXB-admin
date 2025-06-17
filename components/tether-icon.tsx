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
      <rect x="80" y="80" width="352" height="80" fill="currentColor"/>
      
      {/* Vertical stem extending down - longer */}
      <rect x="220" y="80" width="72" height="380" fill="currentColor"/>
      
      {/* Horizontal ellipse through the middle - smaller and lower */}
      <ellipse 
        cx="256" 
        cy="290" 
        rx="180" 
        ry="45" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="35"
      />
    </svg>
  )
}