import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export const useToast = () => {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    // Simple console log for now - you can integrate with a proper toast library
    console.log(`Toast [${variant}]: ${title} - ${description}`)
  }

  return { toast }
}