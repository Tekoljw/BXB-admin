'use client'

import { useState } from "react"

export function useDeferredSearch() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    setSearchTerm(searchInput)
  }

  const handleReset = () => {
    setSearchInput("")
    setSearchTerm("")
  }

  return {
    searchInput,
    setSearchInput,
    searchTerm,
    handleSearch,
    handleReset,
  }
}
