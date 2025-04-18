import { NextResponse } from 'next/server'

export async function GET() {
  // Return a list of placeholder image URLs
  const images = [
    'https://via.placeholder.com/800x600/3498db/ffffff?text=Billboard+1',
    'https://via.placeholder.com/800x600/e74c3c/ffffff?text=Billboard+2',
    'https://via.placeholder.com/800x600/2ecc71/ffffff?text=Billboard+3',
    'https://via.placeholder.com/800x600/f39c12/ffffff?text=Billboard+4'
  ]
  
  return NextResponse.json(images)
}
