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
      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="currentColor"/>
      <path d="M13.2 10.8V8.4H16.8V6H7.2V8.4H10.8V10.8C7.99218 10.9969 6 11.7188 6 12.6C6 13.4812 7.99218 14.2031 10.8 14.4V18H13.2V14.4C16.0078 14.2031 18 13.4812 18 12.6C18 11.7188 16.0078 10.9969 13.2 10.8ZM12 13.5C9.51472 13.5 7.5 12.9627 7.5 12.3C7.5 11.6373 9.51472 11.1 12 11.1C14.4853 11.1 16.5 11.6373 16.5 12.3C16.5 12.9627 14.4853 13.5 12 13.5Z" fill="white"/>
    </svg>
  )
}