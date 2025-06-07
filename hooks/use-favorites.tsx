"use client"

import { useState, useEffect, useCallback } from "react"

// 찜한 사진 ID 목록을 관리하는 훅
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 컴포넌트 마운트 시 localStorage에서 찜 목록 불러오기
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 찜 목록 업데이트 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  // 찜하기/찜 취소 토글 함수
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }, [])

  // 특정 ID가 찜 목록에 있는지 확인하는 함수
  const isFavorite = useCallback(
    (id: number) => {
      return favorites.includes(id)
    },
    [favorites],
  )

  return { favorites, toggleFavorite, isFavorite, isLoaded }
}
