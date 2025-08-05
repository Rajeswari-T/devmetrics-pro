import pool from './connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    console.log('✅ Database schema created successfully');
    
    // Test a simple query
    const result = await pool.query('SELECT COUNT(*) FROM teams');
    console.log(`✅ Database initialized with ${result.rows[0].count} teams`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
}

export default initializeDatabase;
