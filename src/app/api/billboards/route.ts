import { NextResponse } from 'next/server'

// Generate mock billboard data
function generateMockBillboards() {
  const locations = [
    'Downtown Main St', 'Highway 101', 'Central Mall', 'Airport Rd',
    'Business District', 'Stadium Exit', 'Convention Center', 'Beach Blvd'
  ]

  const sizes = ['14ft x 48ft', '10ft x 30ft', '20ft x 60ft', '12ft x 40ft']
  const types = ['Digital', 'Static', 'LED', 'Backlit']
  const facings = ['North', 'South', 'East', 'West']
  const visibilities = ['High', 'Medium', 'Very High', 'Excellent']

  return locations.map((location, index) => {
    const dailyTraffic = Math.floor(Math.random() * 50000) + 10000
    const weeklyImpressions = dailyTraffic * 7
    const pricePerDay = Math.floor(Math.random() * 500) + 200

    return {
      id: `billboard-${index + 1}`,
      title: `Billboard at ${location}`,
      description: `Premium ${types[index % types.length]} billboard located at ${location} with excellent visibility and high traffic.`,
      location: {
        address: `${Math.floor(Math.random() * 1000) + 100} ${location}`,
        city: 'Metro City',
        state: 'CA',
        zip: `9${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        latitude: 34.0522 + (Math.random() * 0.1 - 0.05),
        longitude: -118.2437 + (Math.random() * 0.1 - 0.05)
      },
      size: sizes[index % sizes.length],
      type: types[index % types.length],
      facing: facings[index % facings.length],
      visibility: visibilities[index % visibilities.length],
      dailyTraffic,
      weeklyImpressions,
      pricePerDay,
      pricePerWeek: pricePerDay * 7,
      pricePerMonth: pricePerDay * 30,
      images: [
        `https://via.placeholder.com/800x600/${['3498db', 'e74c3c', '2ecc71', 'f39c12'][index % 4]}/ffffff?text=Billboard+${index + 1}`,
        `https://via.placeholder.com/800x600/${['f39c12', '3498db', 'e74c3c', '2ecc71'][index % 4]}/ffffff?text=Billboard+${index + 1}+View+2`
      ],
      available: Math.random() > 0.3,
      featured: Math.random() > 0.7,
      status: 'Active',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    }
  })
}

export async function GET(request: Request) {
  // Generate mock data
  const billboards = generateMockBillboards()

  // Parse query parameters
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const priceMin = searchParams.get('priceMin')
  const priceMax = searchParams.get('priceMax')
  const sortBy = searchParams.get('sortBy') || 'id'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  // Filter billboards based on query parameters
  let filteredBillboards = [...billboards]

  if (type) {
    filteredBillboards = filteredBillboards.filter(billboard => billboard.type === type)
  }

  if (priceMin) {
    filteredBillboards = filteredBillboards.filter(billboard => billboard.pricePerDay >= parseInt(priceMin))
  }

  if (priceMax) {
    filteredBillboards = filteredBillboards.filter(billboard => billboard.pricePerDay <= parseInt(priceMax))
  }

  // Sort billboards
  if (sortBy === 'price' && sortOrder === 'asc') {
    filteredBillboards.sort((a, b) => a.pricePerDay - b.pricePerDay)
  } else if (sortBy === 'price' && sortOrder === 'desc') {
    filteredBillboards.sort((a, b) => b.pricePerDay - a.pricePerDay)
  } else if (sortBy === 'views') {
    filteredBillboards.sort((a, b) => b.dailyTraffic - a.dailyTraffic)
  } else {
    filteredBillboards.sort((a, b) => a.id.localeCompare(b.id))
  }

  return NextResponse.json(filteredBillboards)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Mock creating a new billboard
  const newBillboard = {
    id: `billboard-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
    status: 'Active'
  }

  return NextResponse.json(newBillboard)
}
