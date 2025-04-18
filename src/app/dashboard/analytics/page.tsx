"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

// Analytics data interface
interface AnalyticsData {
  totalRevenue: number;
  totalInquiries: number;
  totalBookings: number;
  conversionRate: number;
  monthlyRevenue: {
    month: string;
    year?: number;
    revenue: number;
  }[];
  billboardPerformance: {
    id: string;
    title: string;
    inquiries: number;
    bookings: number;
    revenue: number;
    views: number;
    conversionRate: number;
  }[];
  inquirySourceData: {
    source: string;
    count: number;
    percentage: number;
  }[];
  recentActivity: {
    type: string;
    billboardTitle: string;
    clientName: string;
    date: string;
  }[];
}

export default function Analytics() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('year')
  const [sortBy, setSortBy] = useState('revenue')
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalInquiries: 0,
    totalBookings: 0,
    conversionRate: 0,
    monthlyRevenue: [],
    billboardPerformance: [],
    inquirySourceData: [],
    recentActivity: []
  })

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      // Remove user check for development
      // if (!user) return

      try {
        setLoading(true)

        // Fetch analytics data from API
        const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
        const data = await response.json()

        console.log('Analytics data:', data)
        setAnalyticsData(data)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
        // Keep default empty state if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [user, timeRange])

  // Sort billboard performance data
  const sortedBillboardPerformance = [...analyticsData.billboardPerformance].sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue
    if (sortBy === 'inquiries') return b.inquiries - a.inquiries
    if (sortBy === 'bookings') return b.bookings - a.bookings
    if (sortBy === 'views') return b.views - a.views
    if (sortBy === 'conversion') return b.conversionRate - a.conversionRate
    return 0
  })

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        ${analyticsData.totalRevenue.toLocaleString()}
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
                      Total Inquiries
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {analyticsData.totalInquiries}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Bookings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {analyticsData.totalBookings}
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
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Conversion Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {analyticsData.conversionRate}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h2>
          <div className="h-64 relative">
            {/* This would be a real chart in production */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 flex items-end">
                {analyticsData.monthlyRevenue.length > 0 ? (
                  analyticsData.monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full mx-1 bg-primary-600 rounded-t"
                        style={{
                          height: `${(item.revenue / Math.max(...analyticsData.monthlyRevenue.map(i => i.revenue))) * 100}%`,
                          maxHeight: '100%'
                        }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">{item.month}</div>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No revenue data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Billboard Performance */}
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Billboard Performance</h2>
            <div>
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="revenue">Revenue</option>
                <option value="inquiries">Inquiries</option>
                <option value="bookings">Bookings</option>
                <option value="views">Views</option>
                <option value="conversion">Conversion Rate</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billboard
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiries
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBillboardPerformance.length > 0 ? (
                  sortedBillboardPerformance.map((billboard) => (
                    <tr key={billboard.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {billboard.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {billboard.inquiries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {billboard.bookings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${billboard.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {billboard.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {billboard.conversionRate}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No billboard performance data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inquiry Sources and Recent Activity */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Inquiry Sources</h2>
            <div className="space-y-4">
              {analyticsData.inquirySourceData.length > 0 ? (
                analyticsData.inquirySourceData.map((source, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{source.source}</span>
                      <span className="text-sm text-gray-500">{source.count} ({source.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No inquiry source data available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {analyticsData.recentActivity.length > 0 ? (
                  analyticsData.recentActivity.map((activity, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== analyticsData.recentActivity.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.type === 'Inquiry' ? 'bg-blue-500' :
                              activity.type === 'Booking' ? 'bg-green-500' :
                              'bg-yellow-500'
                            }`}>
                              {activity.type === 'Inquiry' ? (
                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                              ) : activity.type === 'Booking' ? (
                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{activity.type}</span> for{' '}
                                <span className="font-medium text-primary-600">{activity.billboardTitle}</span> by{' '}
                                <span className="font-medium text-gray-900">{activity.clientName}</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No recent activity
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
