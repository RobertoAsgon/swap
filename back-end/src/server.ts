
import express from 'express'
import { Router, Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'

class UserDataAccount {
  constructor(partial: Partial<UserDataAccount>) {
    Object.assign(this, partial);
  }

  public address = "";
  public name = "";
  public email = "";
  public profile_picture = "";
}

const { connection } = require('./models/connection');

const app = express();

app.use(cors());

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
  
  const userByAddress: UserDataAccount = await connection()
  .then((schema:any) => schema
    .getTable('users')
    .select(['name', 'email', 'address', 'profile_picture'])
    .where(`address = :address`)
    .bind(`address`, address)
    .execute())
  .then((results:any) => results.fetchOne())
  .then(([name, email, address, profile_picture]) => {
    return new UserDataAccount({ name, address, email, profile_picture });
  });


  // Cria usuário com dados resetado caso não haja registro da conta.
  // To Do Criar rota para atualizar os dados posteriormente.

  // To Do refatorar rota.
  if(!userByAddress.address.length) {
    await connection()
    .then((db:any) => db
      .getTable('users')
      .insert(['name', 'email', 'address', 'profile_picture'])
      .values('', '', address, '')
      .execute());
  }

  res.json(userByAddress)
})

app.use(route)

app.listen(port, () => `server running on port ${port}`)

