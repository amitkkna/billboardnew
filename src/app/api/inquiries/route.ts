import { NextResponse } from 'next/server'

// Generate mock inquiry data
function generateMockInquiries() {
  const billboardLocations = [
    'Downtown Main St', 'Highway 101', 'Central Mall', 'Airport Rd',
    'Business District', 'Stadium Exit', 'Convention Center', 'Beach Blvd'
  ]

  const clientNames = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson']
  const statuses = ['New', 'Contacted', 'Negotiating', 'Converted', 'Lost']
  const sources = ['Website', 'Direct Call', 'Email', 'Social Media', 'Referral']

  return Array.from({ length: 20 }, (_, index) => {
    const billboardIndex = Math.floor(Math.random() * billboardLocations.length)
    const clientIndex = Math.floor(Math.random() * clientNames.length)
    const statusIndex = Math.floor(Math.random() * statuses.length)
    const sourceIndex = Math.floor(Math.random() * sources.length)

    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30))

    const firstName = clientNames[clientIndex].split(' ')[0]
    const lastName = clientNames[clientIndex].split(' ')[1]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`

    return {
      id: `inquiry-${index + 1}`,
      billboard_id: `billboard-${billboardIndex + 1}`,
      billboard: {
        title: `Billboard at ${billboardLocations[billboardIndex]}`,
        location: `${Math.floor(Math.random() * 1000) + 100} ${billboardLocations[billboardIndex]}, Metro City, CA`,
        image_url: `https://via.placeholder.com/800x600/${['3498db', 'e74c3c', '2ecc71', 'f39c12'][billboardIndex % 4]}/ffffff?text=Billboard+${billboardIndex + 1}`
      },
      client_name: clientNames[clientIndex],
      client_email: email,
      client_phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company_name: Math.random() > 0.5 ? `${lastName} Enterprises` : `${firstName}'s Business`,
      message: `I'm interested in advertising on your billboard at ${billboardLocations[billboardIndex]}. Please provide more information about availability and pricing.`,
      preferred_start_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      preferred_duration: ['1 week', '2 weeks', '1 month', '3 months', '6 months'][Math.floor(Math.random() * 5)],
      budget: ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000+'][Math.floor(Math.random() * 3)],
      source: sources[sourceIndex],
      status: statuses[statusIndex],
      notes: Math.random() > 0.7 ? 'Follow up next week.' : '',
      created_at: createdAt.toISOString(),
      updated_at: new Date(createdAt.getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString()
    }
  })
}

export async function GET(request: Request) {
  // Generate mock data
  const inquiries = generateMockInquiries()

  // Parse query parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const search = searchParams.get('search')?.toLowerCase()

  // Filter inquiries based on query parameters
  let filteredInquiries = [...inquiries]

  if (status) {
    filteredInquiries = filteredInquiries.filter(inquiry => inquiry.status === status)
  }

  if (source) {
    filteredInquiries = filteredInquiries.filter(inquiry => inquiry.source === source)
  }

  if (search) {
    filteredInquiries = filteredInquiries.filter(inquiry =>
      inquiry.client_name.toLowerCase().includes(search) ||
      inquiry.client_email.toLowerCase().includes(search) ||
      inquiry.company_name.toLowerCase().includes(search) ||
      inquiry.message.toLowerCase().includes(search)
    )
  }

  // Sort by created_at (newest first)
  filteredInquiries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json(filteredInquiries)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Validate required fields
  if (!body.billboard_id || !body.client_name || !body.client_email || !body.message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Mock creating a new inquiry
  const newInquiry = {
    id: `inquiry-${Date.now()}`,
    ...body,
    status: 'New',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  return NextResponse.json(newInquiry)
}
