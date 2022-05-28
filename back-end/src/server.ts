
import express from 'express'
import { Router, Request, Response } from 'express';
import 'dotenv/config'

const { connection } = require('./models/connection');

const app = express();

const port = process.env.PORT || 3001;

const route = Router()

app.use(express.json())

route.get('/', async (req: Request, res: Response) => {

  const users = await connection()
      .then((schema:any) => schema
        .getTable('users')
        .select()
        .execute())
      .then((results:any) => results.fetchAll())

  console.log('users', users)

  res.json({ message: 'hello world with Typescript' })
})

app.use(route)

app.listen(port, () => `server running on port ${port}`)

