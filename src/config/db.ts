import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            age INT,
            email VARCHAR(300) UNIQUE NOT NULL,
            address TEXT,
            phone VARCHAR(15),
            created_at TIMESTAMP DEFAULT NOW(),
            updateD_at TIMESTAMP DEFAULT NOW()
            )
        `);

  await pool.query(`
              CREATE TABLE IF NOT EXISTS todos(
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
              title VARCHAR(200) NOT NULL,
              description TEXT,
              completed BOOLEAN DEFAULT false,
              due_date DATE,
              created_at DATE DEFAULT NOW(),
              updated_at DATE DEFAULT NOW()
              ) 
            `);
};

export default initDB;
