import { Pool } from "pg";

const connectionString =
  process.env.NEXT_PUBLIC_DB_URL || process.env.DATABASE_URL;

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  globalThis.pgPool ||
  new Pool({
    connectionString,
    ssl:
      connectionString?.includes("sslmode=require") ||
      connectionString?.includes("neon.tech")
        ? { rejectUnauthorized: false }
        : false,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.pgPool = pool;
}

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;
  try {
    // Create table if not exists with status default and check constraint
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        "id" TEXT PRIMARY KEY,
        "userName" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "phone" VARCHAR(50) NOT NULL,
        "address" TEXT NOT NULL,
        "bookingStartDate" VARCHAR(100) NOT NULL,
        "bookingEndDate" VARCHAR(100) NOT NULL,
        "userBookedDate" VARCHAR(100) NOT NULL,
        "status" VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'confirmed', 'cancelled', 'completed')),
        "createdAt" VARCHAR(100) NOT NULL,
        "updatedAt" VARCHAR(100) NOT NULL
      )
    `);

    // Ensure status column has default value 'pending' on existing tables if created earlier
    await pool.query(`
      ALTER TABLE bookings ALTER COLUMN "status" SET DEFAULT 'pending';
    `).catch(() => {
      // Ignore if constraint or alter table fails on pre-existing structure
    });

    isInitialized = true;
  } catch (err) {
    console.error("[DB] Database initialization error:", err);
    throw err;
  }
}

export async function dbQuery(text: string, params?: unknown[]) {
  await initDb();
  return pool.query(text, params);
}

export default pool;
