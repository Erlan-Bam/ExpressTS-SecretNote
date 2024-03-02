import * as dotenv from "dotenv";
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

export const seed = Number(process.env.SEED);
export const port = Number(process.env.SERVER_PORT);
export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASS);

import { Pool } from 'pg';

const pool = new Pool({
  user: db_user,
  host: db_host,
  database: db_name,
  password: db_password,
  port: 5432,
});

export default pool;

