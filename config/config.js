export default {
  bookshelfConfig: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5433',
      user: 'postgres',
      password: 'rea123',
      database: 'templo',
      charset: 'utf8'
    }
  },
  port: 3000,
  jwtSecret: 'S3NH4',
  jwtSession: false
}
