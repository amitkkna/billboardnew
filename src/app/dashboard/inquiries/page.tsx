"use client"

import { useState } from 'react'
import Link from 'next/link'

// Mock data for inquiries
const MOCK_INQUIRIES = [
  {
    id: 1,
    billboardId: 1,
    billboardTitle: 'Premium Highway Billboard',
    clientName: 'John Doe',
    clientEmail: 'john.doe@example.com',
    clientPhone: '(123) 456-7890',
    clientCompany: 'Acme Inc.',
    message: 'We are interested in booking this billboard for our upcoming product launch campaign. Please provide more details about availability in December.',
    date: '2023-11-15',
    status: 'New',
    startDate: '2023-12-01',
    duration: '3'
  },
  {
    id: 2,
    billboardId: 2,
    billboardTitle: 'Downtown Digital Display',
    clientName: 'Jane Smith',
    clientEmail: 'jane.smith@example.com',
    clientPhone: '(123) 456-7891',
    clientCompany: 'Tech Solutions',
    message: 'Looking to advertise our new app in the downtown area. Is this billboard available for a 6-month contract starting in January?',
    date: '2023-11-14',
    status: 'Responded',
    startDate: '2024-01-15',
    duration: '6'
  },
  {
    id: 3,
    billboardId: 3,
    billboardTitle: 'Shopping Mall Hoarding',
    clientName: 'Robert Johnson',
    clientEmail: 'robert.johnson@example.com',
    clientPhone: '(123) 456-7892',
    clientCompany: 'Fashion Outlet',
    message: 'We want to promote our holiday sale at the mall. Please let us know the availability and any discounts for a 2-month booking.',
    date: '2023-11-13',
    status: 'New',
    startDate: '2023-11-25',
    duration: '2'
  },
  {
    id: 4,
    billboardId: 4,
    billboardTitle: 'Stadium Unipole',
    clientName: 'Emily Davis',
    clientEmail: 'emily.davis@example.com',
    clientPhone: '(123) 456-7893',
    clientCompany: 'Sports Gear Co.',
    message: 'Interested in advertising during the upcoming sports season. Can you provide details about visibility during game days and any special packages?',
    date: '2023-11-12',
    status: 'Responded',
    startDate: '2023-12-15',
    duration: '4'
  },
  {
    id: 5,
    billboardId: 1,
    billboardTitle: 'Premium Highway Billboard',
    clientName: 'Michael Wilson',
    clientEmail: 'michael.wilson@example.com',
    clientPhone: '(123) 456-7894',
    clientCompany: 'Car Dealership',
    message: 'We would like to advertise our year-end car sale on this billboard. Is it available for the month of December?',
    date: '2023-11-10',
    status: 'Booked',
    startDate: '2023-12-01',
    duration: '1'
  },
  {
    id: 6,
    billboardId: 5,
    billboardTitle: 'Transit Station Billboard',
    clientName: 'Sarah Brown',
    clientEmail: 'sarah.brown@example.com',
    clientPhone: '(123) 456-7895',
    clientCompany: 'Local Restaurant',
    message: 'Looking to increase foot traffic to our new restaurant location near the transit station. Interested in a 3-month advertising campaign.',
    date: '2023-11-08',
    status: 'Declined',
    startDate: '2023-12-01',
    duration: '3'
  }
]

export default function InquiriesManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('dateDesc')

  // Filter and sort inquiries
  const filteredInquiries = MOCK_INQUIRIES.filter(inquiry => {
    const matchesSearch = inquiry.billboardTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inquiry.clientCompany.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus ? inquiry.status === filterStatus : true
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    if (sortBy === 'dateDesc') return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === 'dateAsc') return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sortBy === 'nameAsc') return a.clientName.localeCompare(b.clientName)
    if (sortBy === 'nameDesc') return b.clientName.localeCompare(a.clientName)
    return 0
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 text-yellow-800'
      case 'Responded':
        return 'bg-blue-100 text-blue-800'
      case 'Booked':
        return 'bg-green-100 text-green-800'
      case 'Declined':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Search and Filters */}
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by billboard, client name, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
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
                <option value="New">New</option>
                <option value="Responded">Responded</option>
                <option value="Booked">Booked</option>
                <option value="Declined">Declined</option>
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
                <option value="dateDesc">Date: Newest First</option>
                <option value="dateAsc">Date: Oldest First</option>
                <option value="nameAsc">Client Name: A-Z</option>
                <option value="nameDesc">Client Name: Z-A</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredInquiries.length} of {MOCK_INQUIRIES.length} inquiries
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <li key={inquiry.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-primary-600 truncate">{inquiry.billboardTitle}</p>
                      <div className={`ml-2 flex-shrink-0 flex ${getStatusBadgeClass(inquiry.status)} text-xs px-2 py-0.5 rounded-full`}>
                        {inquiry.status}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">{inquiry.date}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {inquiry.clientName}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {inquiry.clientEmail}
                      </p>
                      {inquiry.clientCompany && (
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          {inquiry.clientCompany}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>
                        Desired start: {inquiry.startDate} ({inquiry.duration} {parseInt(inquiry.duration) === 1 ? 'month' : 'months'})
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link
                      href={`/dashboard/inquiries/${inquiry.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
                    {inquiry.status === 'New' && (
                      <Link
                        href={`/dashboard/inquiries/${inquiry.id}/respond`}
                        className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Respond
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* No Results */}
        {filteredInquiries.length === 0 && (
          <div className="mt-8 bg-white p-8 shadow rounded-lg text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      New Inquiries
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {MOCK_INQUIRIES.filter(i => i.status === 'New').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Responded
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {MOCK_INQUIRIES.filter(i => i.status === 'Responded').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Booked
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {MOCK_INQUIRIES.filter(i => i.status === 'Booked').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Declined
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {MOCK_INQUIRIES.filter(i => i.status === 'Declined').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
