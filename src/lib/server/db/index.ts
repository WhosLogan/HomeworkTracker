import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/db/schema';
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !env.DATABASE_KEY) throw new Error('DATABASE_KEY is not set');
const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_KEY });
export const db = drizzle(client, {schema});
