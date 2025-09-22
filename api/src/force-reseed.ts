import { seedDatabase } from './db/seed';
import { closeDatabase } from './db/sqlite';

async function forceReseed() {
  try {
    console.log('🌱 Force re-seeding database...');
    await seedDatabase(true);
    console.log('✅ Database re-seeded successfully!');
  } catch (error) {
    console.error('❌ Re-seeding failed:', error);
  } finally {
    await closeDatabase();
  }
}

forceReseed();