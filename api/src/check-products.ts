import { getDatabase, closeDatabase } from './db/sqlite';

async function checkProductData() {
  try {
    const db = await getDatabase();
    console.log('📋 Current products in database:');
    
    const products = await db.all('SELECT product_id, name, description, img_name FROM products ORDER BY product_id');
    
    for (const product of products) {
      console.log(`\n🏦 Product ${product.product_id}:`);
      console.log(`   Name: ${product.name}`);
      console.log(`   Description: ${product.description.substring(0, 80)}...`);
      console.log(`   Image: ${product.img_name}`);
    }
    
  } catch (error) {
    console.error('❌ Query failed:', error);
  } finally {
    await closeDatabase();
  }
}

checkProductData();