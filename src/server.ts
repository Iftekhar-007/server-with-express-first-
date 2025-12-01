import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool, Result } from "pg";
import path from "path";
const app = express();
const port = 5000;
dotenv.config({ path: path.join(process.cwd(), ".env") });

// ! parser
app.use(express.json());
app.use(express.urlencoded());

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
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
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              title VARCHAR(200) NOT NULL,
              description TEXT,
              completed BOOLEAN DEFAULT false,
              due_date DATE,
              created_at DATE DEFAULT NOW(),
              updated_at DATE DEFAULT NOW()
              ) 
            `);
};

initDB();

// ! root api
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from shawon!");
});

// ! post user api
app.post("/users", async (req: Request, res: Response) => {
  const { name, age, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,age,email) VALUES($1,$2,$3) RETURNING *`,
      [name, age, email]
    );

    res.status(201).json({
      message: "successfully added user",
      success: true,
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
      success: false,
    });
  }
});

// ! listen port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
