interface TetherIconProps {
  className?: string
}

export default function TetherIcon({ className = "w-5 h-5" }: TetherIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal top bar */}
      <path d="M6 4h12v4H6z" fill="none" stroke="currentColor"/>
      
      {/* Vertical bar */}
      <path d="M10 4h4v16h-4z" fill="none" stroke="currentColor"/>
      
      {/* Oval/ellipse in the middle */}
      <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor"/>
    </svg>
  )
}