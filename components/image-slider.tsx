"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageType {
  id: number
  src: string
  alt: string
  title: string
}

interface ImageSliderProps {
  images: ImageType[]
  autoSlideInterval?: number
}

export default function ImageSlider({ images, autoSlideInterval = 5000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex, images.length])

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, images.length])

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  useEffect(() => {
    if (isPaused) return

    const slideInterval = setInterval(goToNext, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [goToNext, autoSlideInterval, isPaused])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-100 w-100" onClick={goToPrevious}>
          <ChevronsLeft className="h-12 w-12" />
          <span className="sr-only">이전 슬라이드</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-100 w-100" onClick={goToNext}>
          <ChevronsRight className="h-12 w-12" />
          <span className="sr-only">다음 슬라이드</span>
        </Button>
      </div>

      <div className="h-full w-full relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Link href={`/photos/${image.id}`}>
              <div className="relative w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
