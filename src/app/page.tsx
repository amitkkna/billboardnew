"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// Billboard Carousel Component
function BillboardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }
  const slides = [
    {
      image: '/images/billboard-elegant.svg',
      title: 'Premium Billboard',
      description: 'High-impact static displays for maximum brand visibility'
    },
    {
      image: '/images/unipole-elegant.svg',
      title: 'Unipole Display',
      description: 'Elevated structures perfect for highway and urban locations'
    },
    {
      image: '/images/led-screen-elegant.svg',
      title: 'Digital LED Screen',
      description: 'Dynamic digital displays for engaging multimedia content'
    }
  ]

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-black rounded-lg">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain p-0"
              priority={index === 0}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white p-4 mx-auto backdrop-blur-sm shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">{slide.title}</h3>
              <p className="text-sm text-center text-blue-100">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white p-3 rounded-full hover:from-blue-600/50 hover:to-indigo-600/50 focus:outline-none z-20 backdrop-blur-sm transition-all duration-300 shadow-lg"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white p-3 rounded-full hover:from-blue-600/50 hover:to-indigo-600/50 focus:outline-none z-20 backdrop-blur-sm transition-all duration-300 shadow-lg"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-white/30'
            } hover:bg-white/70 transition-all duration-300 shadow-sm`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-700">BillboardConnect</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/billboards" className="text-gray-700 hover:text-primary-600">Billboards</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">Contact</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-primary-600 hover:text-primary-800">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Find the Perfect Billboard for Your Advertisement</h2>
              <p className="text-xl mb-8">Connect with top advertising companies and book billboards, hoardings, and unipoles for your campaigns.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/billboards" className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 text-center">
                  Browse Billboards
                </Link>
                <Link href="/signup" className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-primary-800 text-center">
                  List Your Billboards
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg bg-black">
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-white p-2 z-20 text-center backdrop-blur-sm">
                  <h3 className="text-sm font-medium tracking-wider">EXPLORE OUR ADVERTISING OPTIONS</h3>
                </div>
                {/* Billboard SVG Carousel */}
                <div className="absolute inset-0">
                  <BillboardCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Billboards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Billboards</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">Explore our selection of premium billboard locations available for your next advertising campaign.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Billboard 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/asa-billboard.svg"
                  alt="Premium Highway Billboard"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-2">Premium Highway Billboard</h3>
                <p className="text-gray-600 mb-4">High visibility location on main highway with 50,000+ daily impressions.</p>
                <Link href="/billboards/1" className="text-primary-600 font-medium hover:text-primary-800">View Details →</Link>
              </div>
            </div>

            {/* Billboard 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/asa-billboard.svg"
                  alt="Downtown Digital Display"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-2">Downtown Digital Display</h3>
                <p className="text-gray-600 mb-4">Digital billboard in the heart of downtown, perfect for dynamic advertising campaigns.</p>
                <Link href="/billboards/2" className="text-primary-600 font-medium hover:text-primary-800">View Details →</Link>
              </div>
            </div>

            {/* Billboard 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/asa-billboard.svg"
                  alt="Shopping Center Billboard"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-2">Shopping Center Billboard</h3>
                <p className="text-gray-600 mb-4">Strategic placement near major shopping center with high foot traffic.</p>
                <Link href="/billboards/3" className="text-primary-600 font-medium hover:text-primary-800">View Details →</Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/billboards" className="px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 inline-block">
              View All Billboards
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BillboardConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Extensive Network</h3>
              <p className="text-gray-600">Access thousands of billboards, hoardings, and unipoles across the country.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Time-Saving</h3>
              <p className="text-gray-600">Find and book advertising spaces quickly without the hassle of multiple inquiries.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Verified Listings</h3>
              <p className="text-gray-600">All advertising spaces are verified to ensure quality and accuracy of information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4">Search</h3>
              <p className="text-gray-600">Browse billboards by location, size, and budget.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4">Compare</h3>
              <p className="text-gray-600">Compare different options to find the best fit for your campaign.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4">Inquire</h3>
              <p className="text-gray-600">Send inquiries directly to advertising companies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-4">Book</h3>
              <p className="text-gray-600">Finalize your booking and launch your campaign.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses finding the perfect advertising spaces for their campaigns.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100">
              Sign Up Now
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-primary-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BillboardConnect</h3>
              <p className="text-gray-400">Connecting advertisers with the perfect outdoor advertising spaces.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/billboards" className="text-gray-400 hover:text-white">Billboards</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2">
                <li><Link href="/list-billboard" className="text-gray-400 hover:text-white">List Your Billboard</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Email: info@billboardconnect.com</p>
              <p className="text-gray-400 mb-2">Phone: +1 (123) 456-7890</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 BillboardConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
