"use client"

import Link from 'next/link'

// Mock data for dashboard
const DASHBOARD_DATA = {
  totalBillboards: 12,
  activeInquiries: 8,
  pendingBookings: 3,
  totalRevenue: 24600,
  recentInquiries: [
    {
      id: 1,
      billboardTitle: 'Premium Highway Billboard',
      clientName: 'John Doe',
      clientEmail: 'john.doe@example.com',
      date: '2023-11-15',
      status: 'New'
    },
    {
      id: 2,
      billboardTitle: 'Downtown Digital Display',
      clientName: 'Jane Smith',
      clientEmail: 'jane.smith@example.com',
      date: '2023-11-14',
      status: 'Responded'
    },
    {
      id: 3,
      billboardTitle: 'Shopping Mall Hoarding',
      clientName: 'Robert Johnson',
      clientEmail: 'robert.johnson@example.com',
      date: '2023-11-13',
      status: 'New'
    },
    {
      id: 4,
      billboardTitle: 'Stadium Unipole',
      clientName: 'Emily Davis',
      clientEmail: 'emily.davis@example.com',
      date: '2023-11-12',
      status: 'Responded'
    }
  ],
  popularBillboards: [
    {
      id: 1,
      title: 'Premium Highway Billboard',
      location: 'Highway 101, San Francisco',
      views: 1250,
      inquiries: 15
    },
    {
      id: 4,
      title: 'Stadium Unipole',
      location: 'Giants Stadium, San Francisco',
      views: 980,
      inquiries: 12
    },
    {
      id: 2,
      title: 'Downtown Digital Display',
      location: 'Market Street, San Francisco',
      views: 850,
      inquiries: 9
    }
  ]
}

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Cards */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Billboards
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {DASHBOARD_DATA.totalBillboards}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/dashboard/billboards" className="font-medium text-primary-600 hover:text-primary-500">
                    View all<span className="sr-only"> billboards</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Inquiries
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {DASHBOARD_DATA.activeInquiries}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/dashboard/inquiries" className="font-medium text-primary-600 hover:text-primary-500">
                    View all<span className="sr-only"> inquiries</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Bookings
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {DASHBOARD_DATA.pendingBookings}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/dashboard/bookings" className="font-medium text-primary-600 hover:text-primary-500">
                    View all<span className="sr-only"> bookings</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                          ${DASHBOARD_DATA.totalRevenue.toLocaleString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/dashboard/analytics" className="font-medium text-primary-600 hover:text-primary-500">
                    View analytics<span className="sr-only"> for revenue</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Inquiries</h2>
            <Link href="/dashboard/inquiries" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {DASHBOARD_DATA.recentInquiries.map((inquiry) => (
                <li key={inquiry.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-primary-600 truncate">{inquiry.billboardTitle}</p>
                        <div className={`ml-2 flex-shrink-0 flex ${
                          inquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        } text-xs px-2 py-0.5 rounded-full`}>
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
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Link href={`/dashboard/inquiries/${inquiry.id}`} className="font-medium text-primary-600 hover:text-primary-500">
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Billboards */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Popular Billboards</h2>
            <Link href="/dashboard/analytics" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View analytics
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {DASHBOARD_DATA.popularBillboards.map((billboard) => (
              <div key={billboard.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{billboard.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{billboard.location}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Views this month</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{billboard.views}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Inquiries</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{billboard.inquiries}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href={`/dashboard/billboards/${billboard.id}`} className="font-medium text-primary-600 hover:text-primary-500">
                      View details<span className="sr-only"> for {billboard.title}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Billboard</h3>
                <p className="mt-1 text-sm text-gray-500">
                  List a new billboard, hoarding, or unipole to attract more clients.
                </p>
                <div className="mt-4">
                  <Link
                    href="/dashboard/billboards/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Billboard
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Respond to Inquiries</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You have {DASHBOARD_DATA.recentInquiries.filter(i => i.status === 'New').length} new inquiries that need your response.
                </p>
                <div className="mt-4">
                  <Link
                    href="/dashboard/inquiries"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Inquiries
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Update Company Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Keep your company information up to date to attract more clients.
                </p>
                <div className="mt-4">
                  <Link
                    href="/dashboard/profile"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
