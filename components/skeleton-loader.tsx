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