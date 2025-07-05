interface DollarRefreshIconProps {
  className?: string
}

export default function DollarRefreshIcon({ className = "w-5 h-5" }: DollarRefreshIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 圆形循环箭头 */}
      <path d="M12 4C16.41 4 20 7.59 20 12s-3.59 8-8 8-8-3.59-8-8c0-1.66.51-3.2 1.38-4.48L3.5 5.64C2.27 7.27 1.5 9.52 1.5 12c0 5.79 4.71 10.5 10.5 10.5S22.5 17.79 22.5 12 17.79 1.5 12 1.5c-2.48 0-4.73.77-6.36 2L7.52 5.38C8.8 4.51 10.34 4 12 4z"/>
      
      {/* 箭头头部 */}
      <path d="M6 3L3 6l3 3V7.5h2V6H6V3z"/>
      <path d="M18 21l3-3-3-3v1.5h-2V18h2v3z"/>
      
      {/* 美元符号 */}
      <path d="M12 7v1.5c1.1 0 2 .9 2 2 0 .55.45 1 1 1s1-.45 1-1c0-2.21-1.79-4-4-4V6c0-.55-.45-1-1-1s-1 .45-1 1v.5c-2.21 0-4 1.79-4 4s1.79 4 4 4v1.5c-1.1 0-2-.9-2-2 0-.55-.45-1-1-1s-1 .45-1 1c0 2.21 1.79 4 4 4V18c0 .55.45 1 1 1s1-.45 1-1v-.5c2.21 0 4-1.79 4-4s-1.79-4-4-4V7zm-1 4.5c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm2 4c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
    </svg>
  )
}