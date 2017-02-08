import passport from 'passport'
import {Strategy, ExtratJwt} from 'passport-jwt'
import Users from '../users/users.model'

export default app => {
  const cfg = app.config
  const opts = {}
  opts.secretOrKey = cfg.jwtSecret
  opts.jwrFromRequest = ExtratJwt.fromAuthHeader()
  const strategy = new Strategy(opts, (payload, done) => {
    Users
      .where({usu_codigo: payload.id})
      .fetch({columns: ['usu_codigo', 'usu_login']})
      .then(user => {
        if (user) {
          return done(null, {
            id: user.toJSON().usu_codigo
          })
        }
        return done(null, false)
      })
      .catch(err => done(err, false))
  })
  passport.use(strategy)
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.jwtSession)
  }
}
