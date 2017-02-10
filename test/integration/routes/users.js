import jwt from 'jwt-simple'
import Users from '../../../users/users.model'

describe('Routes Users', () => {
  let usuCodigo
  let token
  const jwtSecret = app.config.jwtSecret
  const userAuth = {
    usu_login: 'auth@mail.com',
    usu_senha: 'Rea123'
  }
  const defaultUser = {
    usu_login: 'test@mail.com',
    usu_senha: '123'
  }
  const newUser = {
    usu_login: 'newUser@mail.com',
    usu_senha: '12345'
  }
  const userUpdate = {
    usu_login: 'upUser@mail.com',
    usu_senha: 'rea123'
  }

  beforeEach(done => {
    Users
      .where('usu_codigo', '!=', '0')
      .destroy()
      .then(() => {
        Users
          .forge()
          .save(userAuth, {method: 'insert'})
          .then((user) => {
            token = jwt.encode({usu_codigo: user.toJSON().usu_codigo}, jwtSecret)
            Users
              .forge()
              .save(defaultUser, {method: 'insert'})
              .then((userDefault) => {
                usuCodigo = userDefault.toJSON().usu_codigo
                done()
              })
          })
      })
  })

  describe('Route GET /users', () => {
    it('Should return a list of users', done => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[1].usu_login).to.be.eql(defaultUser.usu_login)
          done(err)
        })
    })
  })

  describe('Route GET /users/{id}', () => {
    it('Should return a user', done => {
      request
        .get(`/users/${usuCodigo}`)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.usu_login).to.be.eql(defaultUser.usu_login)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('Should create a user', done => {
      request
        .post('/users')
        .set('Authorization', `JWT ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.body.usu_login).to.be.eql(newUser.usu_login)
          done(err)
        })
    })
  })

  describe('Route PUT /users/{id}', () => {
    it('Should update a user', done => {
      request
        .put(`/users/${usuCodigo}`)
        .set('Authorization', `JWT ${token}`)
        .send(userUpdate)
        .end((err, res) => {
          expect(res.body.usu_login).to.be.eql(userUpdate.usu_login)
          done(err)
        })
    })
  })

  describe('Route DELETE /users/{id}', () => {
    it('Should delete a user', done => {
      request
        .delete(`/users/${usuCodigo}`)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.eql({})
          done(err)
        })
    })
  })
})
