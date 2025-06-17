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
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 7h8M12 7v10"/>
      <circle cx="12" cy="15" r="2" fill="none"/>
    </svg>
  )
}