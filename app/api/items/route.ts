import { NextRequest, NextResponse } from 'next/server'
import { getItems, addItem } from '@/lib/db'

export async function GET() {
  try {
    const items = await getItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = await addItem(body)
    return NextResponse.json(newItem)
  } catch (error) {
    console.error('Error adding item:', error)
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
