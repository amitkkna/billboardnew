import { NextResponse } from 'next/server'

// Generate mock dashboard data
function generateMockDashboardData() {
  const billboardLocations = [
    'Downtown Main St', 'Highway 101', 'Central Mall', 'Airport Rd', 
    'Business District', 'Stadium Exit', 'Convention Center', 'Beach Blvd'
  ]
  
  const clientNames = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson']
  const statuses = ['New', 'Contacted', 'Negotiating', 'Converted', 'Lost']
  
  // Generate recent inquiries
  const recentInquiries = Array.from({ length: 5 }, (_, index) => {
    const billboardIndex = Math.floor(Math.random() * billboardLocations.length)
    const clientIndex = Math.floor(Math.random() * clientNames.length)
    const statusIndex = Math.floor(Math.random() * 2) // Only 'New' or 'Contacted'
    
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 7)) // Last 7 days
    
    return {
      id: `inquiry-${index + 1}`,
      billboardTitle: `Billboard at ${billboardLocations[billboardIndex]}`,
      clientName: clientNames[clientIndex],
      clientEmail: `${clientNames[clientIndex].split(' ')[0].toLowerCase()}@example.com`,
      date: createdAt.toISOString().split('T')[0],
      status: statuses[statusIndex]
    }
  })
  
  // Generate popular billboards
  const popularBillboards = billboardLocations.slice(0, 3).map((location, index) => {
    const views = Math.floor(Math.random() * 50000) + 10000
    const inquiries = Math.floor(views * (Math.random() * 0.05 + 0.01))
    
    return {
      id: `billboard-${index + 1}`,
      title: `Billboard at ${location}`,
      location: `${Math.floor(Math.random() * 1000) + 100} ${location}, Metro City, CA`,
      views,
      inquiries
    }
  })
  
  return {
    totalBillboards: 8,
    activeInquiries: 12,
    pendingBookings: 5,
    totalRevenue: 45750,
    recentInquiries,
    popularBillboards
  }
}

export async function GET() {
  // Generate mock data
  const data = generateMockDashboardData()
  
  return NextResponse.json(data)
}
