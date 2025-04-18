"use client"

import { useState } from 'react'
import Link from 'next/link'

// Real billboard data
const MOCK_BILLBOARDS = [
  {
    id: 1,
    title: 'Premium Highway Billboard',
    location: 'Highway 101, San Francisco',
    size: '14ft x 48ft',
    price: 1200,
    type: 'Billboard',
    views: 50000,
    image: '/billboard.jpg',
    company: 'AdSpace Media',
    description: 'High visibility billboard on the busiest highway in San Francisco. Perfect for brand awareness campaigns.'
  },
  {
    id: 2,
    title: 'Downtown Digital Display',
    location: 'Market Street, San Francisco',
    size: '10ft x 20ft',
    price: 1500,
    type: 'Digital Billboard',
    views: 75000,
    image: '/billboard.jpg',
    company: 'Urban Ads Inc.',
    description: 'Digital billboard in the heart of downtown. Rotating ads with high foot traffic exposure.'
  },
  {
    id: 3,
    title: 'Shopping Mall Hoarding',
    location: 'Westfield Mall, San Francisco',
    size: '8ft x 16ft',
    price: 800,
    type: 'Hoarding',
    views: 30000,
    image: '/billboard.jpg',
    company: 'Mall Media Group',
    description: 'Strategic hoarding placement inside the busiest shopping mall in the city.'
  },
  {
    id: 4,
    title: 'Stadium Unipole',
    location: 'Giants Stadium, San Francisco',
    size: '20ft x 30ft',
    price: 2000,
    type: 'Unipole',
    views: 100000,
    image: '/billboard.jpg',
    company: 'Sports Advertising Co.',
    description: 'Massive unipole visible to all stadium visitors and surrounding areas. Ideal for major campaigns.'
  },
  {
    id: 5,
    title: 'Transit Station Billboard',
    location: 'Powell Street BART Station, San Francisco',
    size: '6ft x 12ft',
    price: 600,
    type: 'Billboard',
    views: 45000,
    image: '/billboard.jpg',
    company: 'Transit Media Solutions',
    description: 'Strategically placed billboard in one of the busiest transit stations in the city.'
  },
  {
    id: 6,
    title: 'Residential Area Hoarding',
    location: 'Sunset District, San Francisco',
    size: '10ft x 24ft',
    price: 700,
    type: 'Hoarding',
    views: 20000,
    image: '/billboard.jpg',
    company: 'Neighborhood Ads',
    description: 'Hoarding in a densely populated residential area with high visibility to locals.'
  }
]

export default function Billboards() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Filter and sort billboards
  const filteredBillboards = MOCK_BILLBOARDS.filter(billboard => {
    const matchesSearch = billboard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          billboard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          billboard.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType ? billboard.type === filterType : true

    const matchesPrice = filterPrice ?
      (filterPrice === 'under500' && billboard.price < 500) ||
      (filterPrice === '500-1000' && billboard.price >= 500 && billboard.price <= 1000) ||
      (filterPrice === '1000-2000' && billboard.price > 1000 && billboard.price <= 2000) ||
      (filterPrice === 'over2000' && billboard.price > 2000) : true

    return matchesSearch && matchesType && matchesPrice
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price
    if (sortBy === 'priceDesc') return b.price - a.price
    if (sortBy === 'viewsDesc') return b.views - a.views
    return a.id - b.id // default sort by id
  })

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
        <h1 className="text-3xl font-bold mb-8">Find the Perfect Billboard</h1>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by location, title, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                id="type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Types</option>
                <option value="Billboard">Billboard</option>
                <option value="Digital Billboard">Digital Billboard</option>
                <option value="Hoarding">Hoarding</option>
                <option value="Unipole">Unipole</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                id="price"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Prices</option>
                <option value="under500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="over2000">Over $2,000</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="default">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="viewsDesc">Most Views</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredBillboards.length} of {MOCK_BILLBOARDS.length} billboards
            </div>
          </div>
        </div>

        {/* Billboard Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBillboards.length > 0 ? (
            filteredBillboards.map(billboard => (
              <div key={billboard.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300 relative">
                  {/* Display the actual billboard image */}
                  <img
                    src={billboard.image}
                    alt={billboard.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm">
                    {billboard.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{billboard.title}</h3>
                  <p className="text-gray-600 mb-2">{billboard.location}</p>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Size: {billboard.size}</span>
                    <span className="font-bold text-primary-700">${billboard.price}/month</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Est. Views: {billboard.views.toLocaleString()}/month</span>
                    <span className="text-gray-700">{billboard.company}</span>
                  </div>
                  <Link
                    href={`/billboards/${billboard.id}`}
                    className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No billboards found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
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
