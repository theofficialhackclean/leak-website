import { sql } from '@vercel/postgres'

export async function getItems() {
  await sql`
    CREATE TABLE IF NOT EXISTS fortnite_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      rarity TEXT NOT NULL,
      status TEXT NOT NULL,
      description TEXT,
      image TEXT NOT NULL,
      preview_image TEXT,
      release_date TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
  // Add preview_image column if it doesn't exist (for migration)
  try {
    await sql`ALTER TABLE fortnite_items ADD COLUMN IF NOT EXISTS preview_image TEXT`
  } catch (error) {
    // Column might already exist, ignore error
  }
  const { rows } = await sql`SELECT * FROM fortnite_items ORDER BY created_at DESC`
  return rows
}

export async function addItem(item: {
  name: string
  type: string
  rarity: string
  status: string
  description: string
  image: string
  preview_image?: string
  release_date?: string
}) {
  const { rows } = await sql`
    INSERT INTO fortnite_items (name, type, rarity, status, description, image, preview_image, release_date)
    VALUES (${item.name}, ${item.type}, ${item.rarity}, ${item.status}, ${item.description}, ${item.image}, ${item.preview_image || null}, ${item.release_date || null})
    RETURNING *
  `
  return rows[0]
}

export async function updateItem(id: number, item: {
  name: string
  type: string
  rarity: string
  status: string
  description: string
  image: string
  preview_image?: string
  release_date?: string
}) {
  const { rows } = await sql`
    UPDATE fortnite_items
    SET name = ${item.name}, type = ${item.type}, rarity = ${item.rarity}, status = ${item.status}, description = ${item.description}, image = ${item.image}, preview_image = ${item.preview_image || null}, release_date = ${item.release_date || null}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function deleteItem(id: number) {
  await sql`DELETE FROM fortnite_items WHERE id = ${id}`
}
