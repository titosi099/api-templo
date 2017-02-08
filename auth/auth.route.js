import jwt from 'jwt-simple'
import Users from '../users/users.model'
import bcrypt from 'bcrypt'

export default app => {
  const cfg = app.config
  app.post('/login', (req, res) => {
    if (req.body.login && req.body.senha) {
      const login = req.body.login
      const senha = req.bod.senha
      Users
        .where({usu_login: login})
        .fetch()
        .then(user => {
          if (bcrypt.compareSync(senha, user.toJSON().usu_senha)) {
            const payload = {id: user.toJSON().usu_codigo}
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
