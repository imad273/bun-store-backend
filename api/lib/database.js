import { Pool } from "pg"

const env = process.env.env;

// Create a pool of connections
const pool = new Pool({
  user: env === "dev" ? process.env.user : process.env.PGUSER,
  host: env === "dev" ? process.env.host : process.env.PGHOST,
  database: env === "dev" ? process.env.database : process.env.PGDATABASE,
  password: env === "dev" ? process.env.password : process.env.PGPASSWORD,
  ...(env !== "dev" && { ssl: true }),
  port: process.env.database_port,
});

export const query = (text, params) => pool.query(text, params);

// Test the connection
try {
  const result = await query('SELECT NOW()');
  console.log('Connected to PostgreSQL:', result.rows[0].now);
} catch (error) {
  console.error('Error connecting to PostgreSQL:', error);
}