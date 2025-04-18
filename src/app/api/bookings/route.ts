import { NextResponse } from 'next/server'

// Generate mock booking data
function generateMockBookings() {
  const billboardLocations = [
    'Downtown Main St', 'Highway 101', 'Central Mall', 'Airport Rd',
    'Business District', 'Stadium Exit', 'Convention Center', 'Beach Blvd'
  ]

  const clientNames = ['Acme Corp', 'Global Media', 'Tech Innovations', 'Local Business', 'Marketing Pro']
  const statuses = ['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled']

  return Array.from({ length: 15 }, (_, index) => {
    const billboardIndex = Math.floor(Math.random() * billboardLocations.length)
    const clientIndex = Math.floor(Math.random() * clientNames.length)
    const statusIndex = Math.floor(Math.random() * statuses.length)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30))

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 7)

    const pricePerDay = Math.floor(Math.random() * 500) + 200
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalAmount = pricePerDay * days

    return {
      id: `booking-${index + 1}`,
      billboard_id: `billboard-${billboardIndex + 1}`,
      billboard: {
        title: `Billboard at ${billboardLocations[billboardIndex]}`,
        location: `${Math.floor(Math.random() * 1000) + 100} ${billboardLocations[billboardIndex]}, Metro City, CA`,
        image_url: `https://via.placeholder.com/800x600/${['3498db', 'e74c3c', '2ecc71', 'f39c12'][billboardIndex % 4]}/ffffff?text=Billboard+${billboardIndex + 1}`
      },
      client_name: clientNames[clientIndex],
      client_email: `contact@${clientNames[clientIndex].toLowerCase().replace(/\s+/g, '')}.com`,
      client_phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      duration_days: days,
      price_per_day: pricePerDay,
      total_amount: totalAmount,
      status: statuses[statusIndex],
      payment_status: Math.random() > 0.3 ? 'Paid' : 'Pending',
      notes: Math.random() > 0.7 ? 'Special requirements for installation.' : '',
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    }
  })
}

export async function GET(request: Request) {
  // Generate mock data
  const bookings = generateMockBookings()

  // Parse query parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  // Filter bookings based on query parameters
  let filteredBookings = [...bookings]

  if (status) {
    filteredBookings = filteredBookings.filter(booking => booking.status === status)
  }

  if (startDate) {
    filteredBookings = filteredBookings.filter(booking => booking.start_date >= startDate)
  }

  if (endDate) {
    filteredBookings = filteredBookings.filter(booking => booking.end_date <= endDate)
  }

  // Sort by created_at (newest first)
  filteredBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json(filteredBookings)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Calculate total amount based on duration
  const startDate = new Date(body.start_date)
  const endDate = new Date(body.end_date)
  const durationInDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const pricePerDay = body.price_per_day || 300
  const totalAmount = durationInDays * pricePerDay

  // Mock creating a new booking
  const newBooking = {
    id: `booking-${Date.now()}`,
    ...body,
    duration_days: durationInDays,
    total_amount: totalAmount,
    created_at: new Date().toISOString(),
    status: 'Pending',
    payment_status: 'Pending'
  }

  return NextResponse.json(newBooking)
}
