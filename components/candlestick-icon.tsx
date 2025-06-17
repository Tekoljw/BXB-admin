interface CandlestickIconProps {
  className?: string
}

export default function CandlestickIcon({ className = "w-5 h-5" }: CandlestickIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* First candlestick */}
      <line x1="4" y1="6" x2="4" y2="18" />
      <rect x="3" y="8" width="2" height="6" fill="currentColor" />
      
      {/* Second candlestick */}
      <line x1="8" y1="4" x2="8" y2="20" />
      <rect x="7" y="7" width="2" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Third candlestick */}
      <line x1="12" y1="3" x2="12" y2="16" />
      <rect x="11" y="5" width="2" height="7" fill="currentColor" />
      
      {/* Fourth candlestick */}
      <line x1="16" y1="7" x2="16" y2="21" />
      <rect x="15" y="10" width="2" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Fifth candlestick */}
      <line x1="20" y1="5" x2="20" y2="18" />
      <rect x="19" y="8" width="2" height="5" fill="currentColor" />
    </svg>
  )
}