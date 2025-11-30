import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const app = express();
const port = 5000;
dotenv.config();

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
              user_id INT REFERENCES users(id)  ON DELETE CASCADE,
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from shawon!");
});

app.post("/users", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(201).json({
    message: "users posted successfully",
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
