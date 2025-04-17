"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock data for billboards (same as in the billboards page)
const MOCK_BILLBOARDS = [
  {
    id: 1,
    title: 'Premium Highway Billboard',
    location: 'Highway 101, San Francisco',
    size: '14ft x 48ft',
    price: 1200,
    type: 'Billboard',
    views: 50000,
    image: '/billboard1.jpg',
    company: 'AdSpace Media',
    description: 'High visibility billboard on the busiest highway in San Francisco. Perfect for brand awareness campaigns.',
    features: ['High traffic area', '24/7 visibility', 'Illuminated at night', 'Weather resistant'],
    specifications: {
      width: '48ft',
      height: '14ft',
      material: 'Vinyl',
      angle: 'Facing southbound traffic',
      illumination: 'LED lighting'
    },
    contactPerson: 'John Smith',
    contactEmail: 'john@adspacemedia.com',
    contactPhone: '(123) 456-7890'
  },
  {
    id: 2,
    title: 'Downtown Digital Display',
    location: 'Market Street, San Francisco',
    size: '10ft x 20ft',
    price: 1500,
    type: 'Digital Billboard',
    views: 75000,
    image: '/billboard2.jpg',
    company: 'Urban Ads Inc.',
    description: 'Digital billboard in the heart of downtown. Rotating ads with high foot traffic exposure.',
    features: ['Digital display', 'Multiple ad rotations', 'Prime downtown location', 'Pedestrian and vehicle visibility'],
    specifications: {
      width: '20ft',
      height: '10ft',
      material: 'LED Screen',
      angle: 'Facing intersection',
      illumination: 'Self-illuminated'
    },
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sarah@urbanads.com',
    contactPhone: '(123) 456-7891'
  },
  {
    id: 3,
    title: 'Shopping Mall Hoarding',
    location: 'Westfield Mall, San Francisco',
    size: '8ft x 16ft',
    price: 800,
    type: 'Hoarding',
    views: 30000,
    image: '/billboard3.jpg',
    company: 'Mall Media Group',
    description: 'Strategic hoarding placement inside the busiest shopping mall in the city.',
    features: ['Indoor placement', 'High-end shopper demographic', 'Near main entrance', 'Climate controlled environment'],
    specifications: {
      width: '16ft',
      height: '8ft',
      material: 'Backlit film',
      angle: 'Facing main walkway',
      illumination: 'Backlit'
    },
    contactPerson: 'Michael Brown',
    contactEmail: 'michael@mallmedia.com',
    contactPhone: '(123) 456-7892'
  },
  {
    id: 4,
    title: 'Stadium Unipole',
    location: 'Giants Stadium, San Francisco',
    size: '20ft x 30ft',
    price: 2000,
    type: 'Unipole',
    views: 100000,
    image: '/billboard4.jpg',
    company: 'Sports Advertising Co.',
    description: 'Massive unipole visible to all stadium visitors and surrounding areas. Ideal for major campaigns.',
    features: ['Massive size', 'Event day exposure', 'Visible from distance', 'Premium location'],
    specifications: {
      width: '30ft',
      height: '20ft',
      material: 'Vinyl',
      angle: 'Facing stadium entrance',
      illumination: 'Spotlight'
    },
    contactPerson: 'David Wilson',
    contactEmail: 'david@sportsadvertising.com',
    contactPhone: '(123) 456-7893'
  },
  {
    id: 5,
    title: 'Transit Station Billboard',
    location: 'Powell Street BART Station, San Francisco',
    size: '6ft x 12ft',
    price: 600,
    type: 'Billboard',
    views: 45000,
    image: '/billboard5.jpg',
    company: 'Transit Media Solutions',
    description: 'Strategically placed billboard in one of the busiest transit stations in the city.',
    features: ['Commuter exposure', 'Extended viewing time', 'Urban demographic', 'Multiple placement options'],
    specifications: {
      width: '12ft',
      height: '6ft',
      material: 'Paper',
      angle: 'Platform facing',
      illumination: 'Station lighting'
    },
    contactPerson: 'Lisa Chen',
    contactEmail: 'lisa@transitmedia.com',
    contactPhone: '(123) 456-7894'
  },
  {
    id: 6,
    title: 'Residential Area Hoarding',
    location: 'Sunset District, San Francisco',
    size: '10ft x 24ft',
    price: 700,
    type: 'Hoarding',
    views: 20000,
    image: '/billboard6.jpg',
    company: 'Neighborhood Ads',
    description: 'Hoarding in a densely populated residential area with high visibility to locals.',
    features: ['Local demographic', 'Long-term exposure', 'Residential area', 'Community focused'],
    specifications: {
      width: '24ft',
      height: '10ft',
      material: 'Vinyl',
      angle: 'Street facing',
      illumination: 'None'
    },
    contactPerson: 'Robert Taylor',
    contactEmail: 'robert@neighborhoodads.com',
    contactPhone: '(123) 456-7895'
  }
]

export default function BillboardDetail() {
  const params = useParams()
  const billboardId = parseInt(params.id as string)
  
  const billboard = MOCK_BILLBOARDS.find(b => b.id === billboardId)
  
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    startDate: '',
    duration: '1'
  })
  
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  
  if (!billboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Billboard Not Found</h1>
          <p className="text-gray-600 mb-6">The billboard you're looking for doesn't exist or has been removed.</p>
          <Link href="/billboards" className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Browse All Billboards
          </Link>
        </div>
      </div>
    )
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInquiryForm(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormSubmitted(true)
      console.log('Inquiry submitted:', { billboardId, ...inquiryForm })
    } catch (error) {
      console.error('Error submitting inquiry:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-700">BillboardConnect</Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/billboards" className="text-primary-600 font-medium">Billboards</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">Contact</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-primary-600 hover:text-primary-800">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/billboards" className="text-primary-600 hover:text-primary-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Billboards
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto bg-gray-300 relative">
              {/* This would be an actual image in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600">Billboard Image</p>
              </div>
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                {billboard.type}
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-2">{billboard.title}</h1>
              <p className="text-gray-600 mb-4">{billboard.location}</p>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-primary-700">${billboard.price}</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{billboard.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="text-gray-800">{billboard.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Monthly Views</h3>
                  <p className="text-gray-800">{billboard.views.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="text-gray-800">{billboard.company}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="text-gray-800">{billboard.type}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 md:px-8 py-6">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {billboard.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-200 px-6 md:px-8 py-6">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                <p className="text-gray-800">{billboard.specifications.width} × {billboard.specifications.height}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Material</h3>
                <p className="text-gray-800">{billboard.specifications.material}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Angle</h3>
                <p className="text-gray-800">{billboard.specifications.angle}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Illumination</h3>
                <p className="text-gray-800">{billboard.specifications.illumination}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 md:px-8 py-6">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                <p className="text-gray-800">{billboard.contactPerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-800">{billboard.contactEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-gray-800">{billboard.contactPhone}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Inquiry Form */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 md:px-8 py-6">
            <h2 className="text-2xl font-bold mb-6">Interested in this billboard?</h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Thank you for your inquiry! A representative from {billboard.company} will contact you shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={inquiryForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={inquiryForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={inquiryForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={inquiryForm.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Desired Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={inquiryForm.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Duration (months)
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={inquiryForm.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="1">1 month</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={inquiryForm.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your advertising campaign and any specific requirements."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Similar Billboards */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Billboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_BILLBOARDS.filter(b => b.id !== billboard.id && b.type === billboard.type).slice(0, 3).map(similarBillboard => (
              <div key={similarBillboard.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300 relative">
                  {/* This would be an actual image in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-600">Billboard Image</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm">
                    {similarBillboard.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{similarBillboard.title}</h3>
                  <p className="text-gray-600 mb-2">{similarBillboard.location}</p>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Size: {similarBillboard.size}</span>
                    <span className="font-bold text-primary-700">${similarBillboard.price}/month</span>
                  </div>
                  <Link 
                    href={`/billboards/${similarBillboard.id}`}
                    className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
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
