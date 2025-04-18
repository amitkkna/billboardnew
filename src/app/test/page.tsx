"use client"

import { useState, useEffect } from 'react'

export default function TestPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [bookingsData, setBookingsData] = useState<any[]>([])
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch dashboard data
        const dashboardResponse = await fetch('/api/dashboard')
        const dashboardJson = await dashboardResponse.json()
        setDashboardData(dashboardJson)

        // Fetch bookings data
        const bookingsResponse = await fetch('/api/bookings')
        const bookingsJson = await bookingsResponse.json()
        setBookingsData(bookingsJson)

        // Fetch analytics data
        const analyticsResponse = await fetch('/api/analytics')
        const analyticsJson = await analyticsResponse.json()
        setAnalyticsData(analyticsJson)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Dashboard Data</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(dashboardData, null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bookings Data (First 2 items)</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {bookingsData ? JSON.stringify(bookingsData.slice(0, 2), null, 2) : 'No data'}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Analytics Data</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(analyticsData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
