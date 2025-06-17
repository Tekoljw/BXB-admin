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
      <circle cx="12" cy="12" r="11" />
      <path d="M7.2 6h9.6v2.4H13.2v2.4c2.8.2 4.8.9 4.8 1.8s-2 1.6-4.8 1.8V18h-2.4v-3.6c-2.8-.2-4.8-.9-4.8-1.8s2-1.6 4.8-1.8V8.4H7.2V6z"/>
      <ellipse cx="12" cy="12.6" rx="4.5" ry="0.9"/>
    </svg>
  )
}