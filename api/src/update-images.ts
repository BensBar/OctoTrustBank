import { getDatabase, closeDatabase } from './db/sqlite';

async function updateProductImages() {
  try {
    const db = await getDatabase();
    console.log('🔄 Updating product images...');
    
    // Update each product with the new image name
    const updates = [
      { id: 1, imgName: 'savings-account.svg' },
      { id: 2, imgName: 'checking-account.svg' },
      { id: 3, imgName: 'investment-portfolio.svg' },
      { id: 4, imgName: 'credit-monitoring.svg' },
      { id: 5, imgName: 'business-banking.svg' },
      { id: 6, imgName: 'personal-finance.svg' },
      { id: 7, imgName: 'mobile-banking.svg' },
      { id: 8, imgName: 'loan-optimization.svg' },
      { id: 9, imgName: 'fraud-protection.svg' },
      { id: 10, imgName: 'retirement-planning.svg' },
      { id: 11, imgName: 'digital-wallet.svg' },
      { id: 12, imgName: 'financial-analytics.svg' }
    ];
    
    for (const update of updates) {
      await db.run(
        'UPDATE products SET img_name = ? WHERE product_id = ?',
        [update.imgName, update.id]
      );
      console.log(`✅ Updated product ${update.id} to use ${update.imgName}`);
    }
    
    console.log('✅ All product images updated successfully!');
  } catch (error) {
    console.error('❌ Update failed:', error);
  } finally {
    await closeDatabase();
  }
}

updateProductImages();