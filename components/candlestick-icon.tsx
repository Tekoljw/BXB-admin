interface CandlestickIconProps {
  className?: string
}

export default function CandlestickIcon({ className = "w-5 h-5" }: CandlestickIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chart bars - increasing height from left to right */}
      <rect x="2" y="16" width="2.5" height="6" fill="currentColor" />
      <rect x="6" y="13" width="2.5" height="9" fill="currentColor" />
      <rect x="10" y="18" width="2.5" height="4" fill="currentColor" />
      <rect x="14" y="10" width="2.5" height="12" fill="currentColor" />
      <rect x="18" y="6" width="2.5" height="16" fill="currentColor" />
      
      {/* Trending line connecting the tops of bars */}
      <polyline 
        points="3.25,16 7.25,13 11.25,18 15.25,10 19.25,6 22,3"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Upward arrow at the end */}
      <polyline 
        points="18,3 22,3 22,7"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}