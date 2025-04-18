"use client"

import { useState, useEffect, useRef, TouchEvent } from 'react'
import Image from 'next/image'

interface CarouselImage {
  src: string
  alt?: string
  caption?: string
}

interface CarouselProps {
  images: (string | CarouselImage)[]
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
  showCaptions?: boolean
}

export default function ImageCarousel({
  images,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  showCaptions = false
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false))
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Track loaded images
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  // Manual navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current
    const threshold = 50 // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left, go to next
        goToNext()
      } else {
        // Swipe right, go to previous
        goToPrevious()
      }
    }

    // Reset values
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="relative w-full h-full">
      {/* Carousel container */}
      <div
        className="relative w-full h-full overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        {images.map((image, index) => {
          const imgSrc = typeof image === 'string' ? image : image.src
          const imgAlt = typeof image === 'string' ? `Billboard ${index + 1}` : (image.alt || `Billboard ${index + 1}`)
          const imgCaption = typeof image === 'string' ? null : image.caption

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                    <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>

              {showCaptions && imgCaption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-center">
                  <p>{imgCaption}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      {showControls && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 focus:outline-none z-10 hidden md:block"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 focus:outline-none z-10 hidden md:block"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
