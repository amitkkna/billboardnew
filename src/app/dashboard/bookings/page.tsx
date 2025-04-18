"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

// Booking interface
interface Booking {
  id: string;
  billboardId: string;
  billboardTitle: string;
  billboardImage: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function BookingsManagement() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPayment, setFilterPayment] = useState('')
  const [sortBy, setSortBy] = useState('dateDesc')
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      // Remove user check for development
      // if (!user) return

      try {
        setLoading(true)

        // Fetch bookings from API
        const response = await fetch('/api/bookings')
        const data = await response.json()

        console.log('Bookings data:', data)

        // Format the data to match our interface
        const formattedBookings = data.map((booking: any) => ({
          id: booking.id,
          billboardId: booking.billboard_id,
          billboardTitle: booking.billboard?.title || 'Unknown Billboard',
          billboardImage: booking.billboard?.image_url || '/images/billboard-1.jpg',
          clientName: booking.client_name,
          clientEmail: booking.client_email,
          clientCompany: booking.client_company || booking.client_name + ' Company',
          startDate: booking.start_date,
          endDate: booking.end_date,
          duration: booking.duration_days || 30,
          totalAmount: parseFloat(booking.total_amount),
          status: booking.status,
          paymentStatus: booking.payment_status,
          createdAt: new Date(booking.created_at).toISOString().split('T')[0]
        }))

        setBookings(formattedBookings)
      } catch (error) {
        console.error('Error fetching bookings:', error)
        // Keep empty state if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  // Filter and sort bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.billboardTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.clientCompany.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus ? booking.status === filterStatus : true
    const matchesPayment = filterPayment ? booking.paymentStatus === filterPayment : true

    return matchesSearch && matchesStatus && matchesPayment
  }).sort((a, b) => {
    if (sortBy === 'dateAsc') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    if (sortBy === 'dateDesc') return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    if (sortBy === 'amountAsc') return a.totalAmount - b.totalAmount
    if (sortBy === 'amountDesc') return b.totalAmount - a.totalAmount
    if (sortBy === 'durationAsc') return a.duration - b.duration
    if (sortBy === 'durationDesc') return b.duration - a.duration
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // default sort by created date
  })

  // Calculate total revenue
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
  const activeBookings = bookings.filter(booking => booking.status === 'Active').length
  const pendingBookings = bookings.filter(booking => booking.status === 'Pending').length

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          <div className="mt-8 flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Revenue
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ${totalRevenue.toLocaleString()}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Bookings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {activeBookings}
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
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Bookings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {pendingBookings}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                id="payment"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Payment Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
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
                <option value="dateDesc">Start Date (Newest First)</option>
                <option value="dateAsc">Start Date (Oldest First)</option>
                <option value="amountDesc">Amount (High to Low)</option>
                <option value="amountAsc">Amount (Low to High)</option>
                <option value="durationDesc">Duration (Longest First)</option>
                <option value="durationAsc">Duration (Shortest First)</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={booking.billboardImage}
                          alt={booking.billboardTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-primary-600">{booking.billboardTitle}</p>
                        <p className="text-sm text-gray-500">Booked by {booking.clientName} ({booking.clientCompany})</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        booking.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {booking.startDate} to {booking.endDate} ({booking.duration} day{booking.duration > 1 ? 's' : ''})
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        ${booking.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Link href={`/dashboard/bookings/${booking.id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                        View Details
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        Generate Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* No Results */}
        {filteredBookings.length === 0 && (
          <div className="mt-8 bg-white p-8 shadow rounded-lg text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
