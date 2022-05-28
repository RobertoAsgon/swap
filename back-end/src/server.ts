
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

route.get('/user/getUserByAddress', async (req: Request, res: Response) => {

  const { address } = req?.query;

  console.log('address',address)
  
  const userByAddress = await connection()
  .then((schema:any) => schema
    .getTable('users')
    .select(['name', 'email', 'address', 'profile_picture'])
    .where(`address = :address`)
    .bind(`address`, address)
    .execute())
  .then((results:any) => results.fetchOne())


  // Cria usuário com dados resetado caso não haja registro da conta.
  // To Do Criar rota para atualizar os dados posteriormente.
  // To Do refatorar rota.
  if(!userByAddress?.length) {
    await connection()
    .then((db:any) => db
      .getTable('users')
      .insert(['name', 'email', 'address', 'profile_picture'])
      .values('', '', address, '')
      .execute());
  }

  res.json({ message: 'Ok' })
})

app.use(route)

app.listen(port, () => `server running on port ${port}`)

