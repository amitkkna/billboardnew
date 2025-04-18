import { NextResponse } from 'next/server'

// Generate mock data for analytics
function generateMockAnalyticsData(timeRange: string) {
  // Generate monthly revenue data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = new Date().getMonth()

  let monthlyRevenue = []

  if (timeRange === 'month') {
    // Last 4 weeks
    for (let i = 0; i < 4; i++) {
      monthlyRevenue.push({
        month: `Week ${i+1}`,
        revenue: Math.floor(Math.random() * 10000) + 5000
      })
    }
  } else if (timeRange === 'quarter') {
    // Last 3 months
    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonth - i + 12) % 12
      monthlyRevenue.push({
        month: months[monthIndex],
        revenue: Math.floor(Math.random() * 30000) + 15000
      })
    }
  } else if (timeRange === 'year') {
    // Last 12 months
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - i + 12) % 12
      monthlyRevenue.push({
        month: months[monthIndex],
        revenue: Math.floor(Math.random() * 50000) + 20000
      })
    }
  } else {
    // All time (last 2 years by quarters)
    for (let i = 0; i < 8; i++) {
      monthlyRevenue.push({
        month: `Q${(i % 4) + 1} ${new Date().getFullYear() - Math.floor(i / 4)}`,
        revenue: Math.floor(Math.random() * 100000) + 50000
      })
    }
  }

  // Reverse to show chronological order
  monthlyRevenue = monthlyRevenue.reverse()

  // Calculate total revenue
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0)

  // Generate billboard performance data
  const billboardLocations = [
    'Downtown Main St', 'Highway 101', 'Central Mall', 'Airport Rd',
    'Business District', 'Stadium Exit', 'Convention Center', 'Beach Blvd'
  ]

  const billboardPerformance = billboardLocations.map((location, index) => {
    const views = Math.floor(Math.random() * 50000) + 10000
    const inquiries = Math.floor(views * (Math.random() * 0.05 + 0.01))
    const bookings = Math.floor(inquiries * (Math.random() * 0.3 + 0.1))
    const revenue = bookings * (Math.floor(Math.random() * 2000) + 1000)
    const conversionRate = Math.round((bookings / inquiries) * 100)

    return {
      id: `billboard-${index + 1}`,
      title: `Billboard at ${location}`,
      views,
      inquiries,
      bookings,
      revenue,
      conversionRate
    }
  })

  // Calculate totals
  const totalInquiries = billboardPerformance.reduce((sum, item) => sum + item.inquiries, 0)
  const totalBookings = billboardPerformance.reduce((sum, item) => sum + item.bookings, 0)
  const conversionRate = Math.round((totalBookings / totalInquiries) * 100)

  // Generate inquiry source data
  const sources = ['Website', 'Direct Call', 'Email', 'Social Media', 'Referral']
  const totalSourceCount = totalInquiries

  let remainingCount = totalSourceCount
  const inquirySourceData = sources.map((source, index) => {
    let count
    if (index === sources.length - 1) {
      count = remainingCount
    } else {
      count = Math.floor(remainingCount * (Math.random() * 0.4 + 0.1))
      remainingCount -= count
    }

    return {
      source,
      count,
      percentage: Math.round((count / totalSourceCount) * 100)
    }
  }).sort((a, b) => b.count - a.count)

  // Generate recent activity
  const clientNames = ['Acme Corp', 'Global Media', 'Tech Innovations', 'Local Business', 'Marketing Pro']
  const activityTypes = ['Inquiry', 'Booking', 'Payment']

  const recentActivity = Array.from({ length: 5 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 14))

    return {
      type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
      billboardTitle: `Billboard at ${billboardLocations[Math.floor(Math.random() * billboardLocations.length)]}`,
      clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  })

  return {
    totalRevenue,
    totalInquiries,
    totalBookings,
    conversionRate,
    monthlyRevenue,
    billboardPerformance,
    inquirySourceData,
    recentActivity
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get('timeRange') || 'year'

  // Generate mock data
  const data = generateMockAnalyticsData(timeRange)

  return NextResponse.json(data)
}
