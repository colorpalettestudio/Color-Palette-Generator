import { neon } from '@neondatabase/serverless';
import { PRESET_PALETTES } from '../client/src/lib/palettes';

const sql = neon(process.env.DATABASE_URL!);

// Top 10 palettes should have the highest counts
const TOP_PALETTES = [
  'Lavender Fields',
  'Coastal Dawn',
  'Purple Reign',
  'Tangerine Sky',
  'Lavender Mist',
  'Starlight',
  'Champagne Toast',
  'Blush & Bashful',
  'Underwater',
  'Pastel Dream'
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedLikes() {
  console.log('Starting to seed palette likes...');
  
  // Clear existing likes
  await sql`DELETE FROM palette_likes`;
  console.log('Cleared existing likes');
  
  const allPalettes = PRESET_PALETTES.map(p => p.name);
  
  for (const paletteName of allPalettes) {
    const isTopPalette = TOP_PALETTES.includes(paletteName);
    
    // Top palettes get 14,000-19,000 likes
    // Regular palettes get 2,300-13,000 likes
    const likeCount = isTopPalette 
      ? getRandomInt(14000, 19000)
      : getRandomInt(2300, 13000);
    
    await sql`
      INSERT INTO palette_likes (palette_name, like_count)
      VALUES (${paletteName}, ${likeCount})
    `;
    
    console.log(`✓ ${paletteName}: ${likeCount.toLocaleString()} likes ${isTopPalette ? '⭐ TOP' : ''}`);
  }
  
  console.log(`\n✅ Successfully seeded ${allPalettes.length} palettes with likes!`);
  
  // Show top 10 by like count
  const topPalettes = await sql`
    SELECT palette_name, like_count 
    FROM palette_likes 
    ORDER BY like_count DESC 
    LIMIT 10
  `;
  
  console.log('\n🏆 Top 10 Most Loved Palettes:');
  topPalettes.forEach((p: any, i: number) => {
    console.log(`${i + 1}. ${p.palette_name}: ${p.like_count.toLocaleString()} likes`);
  });
}

seedLikes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding likes:', error);
    process.exit(1);
  });
