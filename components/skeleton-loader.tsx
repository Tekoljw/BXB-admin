import CreativeLoader from "./creative-loader"

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'rect' | 'circle'
  height?: string
  width?: string
}

export default function SkeletonLoader({ 
  className = "", 
  variant = 'rect',
  height = "h-4",
  width = "w-full"
}: SkeletonLoaderProps) {
  // For circle variant, show creative loader
  if (variant === 'circle') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <CreativeLoader 
          size={20} 
          variant="circle" 
          color="#00D4AA" 
          dotColor="#00D4AA"
          duration={2}
        />
      </div>
    )
  }
  
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700"
  
  const variantClasses = {
    text: "rounded",
    rect: "rounded-md",
    circle: "rounded-full"
  }

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${height} ${width} ${className}`}
    />
  )
}