import { sql } from '@vercel/postgres'

export async function getItems() {
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
  releaseDate?: string
}) {
  const { rows } = await sql`
    INSERT INTO fortnite_items (name, type, rarity, status, description, image, release_date)
    VALUES (${item.name}, ${item.type}, ${item.rarity}, ${item.status}, ${item.description}, ${item.image}, ${item.releaseDate || null})
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
  releaseDate?: string
}) {
  const { rows } = await sql`
    UPDATE fortnite_items
    SET name = ${item.name}, type = ${item.type}, rarity = ${item.rarity}, status = ${item.status}, description = ${item.description}, image = ${item.image}, release_date = ${item.releaseDate || null}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function deleteItem(id: number) {
  await sql`DELETE FROM fortnite_items WHERE id = ${id}`
}
