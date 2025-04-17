"use client"

import { useState } from 'react'
import Link from 'next/link'

// Mock data for billboards
const MOCK_BILLBOARDS = [
  {
    id: 1,
    title: 'Premium Highway Billboard',
    location: 'Highway 101, San Francisco',
    size: '14ft x 48ft',
    price: 1200,
    type: 'Billboard',
    status: 'Active',
    inquiries: 15,
    views: 1250,
    lastUpdated: '2023-11-01'
  },
  {
    id: 2,
    title: 'Downtown Digital Display',
    location: 'Market Street, San Francisco',
    size: '10ft x 20ft',
    price: 1500,
    type: 'Digital Billboard',
    status: 'Active',
    inquiries: 9,
    views: 850,
    lastUpdated: '2023-10-28'
  },
  {
    id: 3,
    title: 'Shopping Mall Hoarding',
    location: 'Westfield Mall, San Francisco',
    size: '8ft x 16ft',
    price: 800,
    type: 'Hoarding',
    status: 'Active',
    inquiries: 7,
    views: 620,
    lastUpdated: '2023-10-15'
  },
  {
    id: 4,
    title: 'Stadium Unipole',
    location: 'Giants Stadium, San Francisco',
    size: '20ft x 30ft',
    price: 2000,
    type: 'Unipole',
    status: 'Active',
    inquiries: 12,
    views: 980,
    lastUpdated: '2023-11-05'
  },
  {
    id: 5,
    title: 'Transit Station Billboard',
    location: 'Powell Street BART Station, San Francisco',
    size: '6ft x 12ft',
    price: 600,
    type: 'Billboard',
    status: 'Inactive',
    inquiries: 3,
    views: 0,
    lastUpdated: '2023-09-20'
  },
  {
    id: 6,
    title: 'Residential Area Hoarding',
    location: 'Sunset District, San Francisco',
    size: '10ft x 24ft',
    price: 700,
    type: 'Hoarding',
    status: 'Active',
    inquiries: 5,
    views: 320,
    lastUpdated: '2023-10-10'
  }
]

export default function BillboardsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Filter and sort billboards
  const filteredBillboards = MOCK_BILLBOARDS.filter(billboard => {
    const matchesSearch = billboard.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          billboard.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType ? billboard.type === filterType : true
    const matchesStatus = filterStatus ? billboard.status === filterStatus : true
    
    return matchesSearch && matchesType && matchesStatus
  }).sort((a, b) => {
    if (sortBy === 'titleAsc') return a.title.localeCompare(b.title)
    if (sortBy === 'titleDesc') return b.title.localeCompare(a.title)
    if (sortBy === 'priceAsc') return a.price - b.price
    if (sortBy === 'priceDesc') return b.price - a.price
    if (sortBy === 'inquiriesDesc') return b.inquiries - a.inquiries
    if (sortBy === 'viewsDesc') return b.views - a.views
    if (sortBy === 'dateDesc') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    return a.id - b.id // default sort by id
  })

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Billboards</h1>
          <Link
            href="/dashboard/billboards/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Billboard
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Search and Filters */}
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by title or location"
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                <option value="titleAsc">Title: A-Z</option>
                <option value="titleDesc">Title: Z-A</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="inquiriesDesc">Most Inquiries</option>
                <option value="viewsDesc">Most Views</option>
                <option value="dateDesc">Recently Updated</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredBillboards.length} of {MOCK_BILLBOARDS.length} billboards
            </div>
          </div>
        </div>

        {/* Billboard Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billboard
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inquiries
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBillboards.map((billboard) => (
                      <tr key={billboard.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                              <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {billboard.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {billboard.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{billboard.type}</div>
                          <div className="text-sm text-gray-500">{billboard.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${billboard.price}/month</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            billboard.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {billboard.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {billboard.inquiries}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {billboard.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {billboard.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/dashboard/billboards/${billboard.id}`} className="text-primary-600 hover:text-primary-900">
                              View
                            </Link>
                            <Link href={`/dashboard/billboards/${billboard.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </Link>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredBillboards.length === 0 && (
          <div className="mt-8 bg-white p-8 shadow rounded-lg text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No billboards found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/billboards/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Billboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
