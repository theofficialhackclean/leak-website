import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://fortnite-api.com/v1/shop', {
      headers: {
        'User-Agent': 'Fortnite-Leaks-App/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Fortnite shop:', error)
    return NextResponse.json({ error: 'Failed to fetch shop data' }, { status: 500 })
  }
}
