// Vercel Serverless Function for Palette Likes
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      const likes = await sql`SELECT * FROM palette_likes ORDER BY like_count DESC`;
      return res.status(200).json(likes);
    }

    if (req.method === 'POST') {
      const { paletteName, action } = req.body;
      
      if (action === 'like') {
        await sql`
          INSERT INTO palette_likes (palette_name, like_count)
          VALUES (${paletteName}, 1)
          ON CONFLICT (palette_name)
          DO UPDATE SET like_count = palette_likes.like_count + 1
        `;
      } else if (action === 'unlike') {
        await sql`
          UPDATE palette_likes
          SET like_count = GREATEST(0, like_count - 1)
          WHERE palette_name = ${paletteName}
        `;
      }

      const updated = await sql`SELECT * FROM palette_likes WHERE palette_name = ${paletteName}`;
      return res.status(200).json(updated[0] || { paletteName, likeCount: 0 });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
