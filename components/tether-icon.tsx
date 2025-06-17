interface TetherIconProps {
  className?: string
}

export default function TetherIcon({ className = "w-5 h-5" }: TetherIconProps) {
  return (
    <img
      src="/attached_assets/image_1750164407866.png"
      alt="USDT"
      className={`${className} filter brightness-0 invert`}
      style={{
        filter: 'brightness(0) invert(1)', // Makes the image white
      }}
    />
  )
}