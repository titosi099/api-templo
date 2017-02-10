import jwt from 'jwt-simple'
import Users from '../users/users.model'

export default app => {
  const cfg = app.config
  app.post('/login', (req, res) => {
    if (req.body.login && req.body.senha) {
      const login = req.body.login
      const senha = req.body.senha
      Users
        .where({usu_login: login})
        .fetch()
        .then(user => {
          if (Users.forge().isPassword(user.toJSON().usu_senha, senha)) {
            const payload = {usu_codigo: user.toJSON().usu_codigo}
            res.json({token: jwt.encode(payload, cfg.jwtSecret)})
          } else {
            res.sendStatus(401)
          }
        })
        .catch(() => res.sendStatus(401))
    } else {
      res.sendStatus(401)
    }
  })
}
