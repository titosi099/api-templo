import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import Users from '../users/users.model'

export default app => {
  const cfg = app.config
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = cfg.jwtSecret
  const strategy = new Strategy(opts, (payload, done) => {
    Users
    .where({ usu_codigo: payload.usu_codigo })
    .fetch()
    .then((user) => {
      if (user) {
        return done(null, {
          usu_codigo: user.toJSON().usu_codigo
        })
      }
      return done(null, false)
    })
    .catch(error => done(error, false))
  })
  passport.serializeUser((Users, done) => done(null, Users))
  passport.deserializeUser((Users, done) => done(null, Users))
  passport.use(strategy)
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.jwtSession)
  }
}
