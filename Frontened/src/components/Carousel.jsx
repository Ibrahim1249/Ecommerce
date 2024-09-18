
import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import first from "../assets/first.jpg"
import second from "../assets/second.jpg"
import third from "../assets/third.jpg"


const slides = [
  {
    url: first,
    alt: 'New Summer Collection',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
  },
  {
    url: second,
    alt: 'Electronics Deals',
    title: 'Tech Bonanza',
    subtitle: 'Latest gadgets at unbeatable prices',
  },
  {
    url: third,
    alt: 'Home Decor Items',
    title: 'Home Makeover',
    subtitle: 'Transform your space with our new decor range',
  },
]

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [currentIndex])

  return (
    (<div className="relative h-[500px] w-full mx-auto my-4 overflow-hidden">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="h-full w-full bg-center bg-cover duration-500">
        <div
          className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-2">{slides[currentIndex].title}</h2>
          <p className="text-xl">{slides[currentIndex].subtitle}</p>
        </div>
      </div>
      {/* Left Arrow */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 cursor-pointer">
        <ChevronLeftIcon
          onClick={prevSlide}
          className="h-10 w-10 text-white"
          aria-label="Previous slide" />
      </div>
      {/* Right Arrow */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer">
        <ChevronRightIcon
          onClick={nextSlide}
          className="h-10 w-10 text-white"
          aria-label="Next slide" />
      </div>
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
            }`}></div>
        ))}
      </div>
    </div>)
  );
}