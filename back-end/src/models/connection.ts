const mysqlx = require('@mysql/xdevapi');

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 33060,
};

let schema: any;

const connection = async () => (
  schema
    ? Promise.resolve(schema)
    : mysqlx
      .getSession(databaseConfig)
      .then(async (session:any) => {
        schema = await session.getSchema(process.env.DB_NAME);
        return schema;
      })
      .catch((error:any) => {
        console.error('Error connection database: ', error);
        process.exit(1);
      }));

module.exports = { connection };
