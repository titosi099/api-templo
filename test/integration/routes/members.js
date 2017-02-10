import jwt from 'jwt-simple'
import Members from '../../../members/members.model'
import Users from '../../../users/users.model'

describe('Routes Members', () => {
  let memCodigo
  let token
  const jwtSecret = app.config.jwtSecret
  const userAuth = {
    usu_login: 'auth@mail.com',
    usu_senha: 'Rea123'
  }
  const defaultMember = {
    mem_nome: 'Ronaldo'
  }
  const newMember = {
    mem_nome: 'newMember'
  }
  const updateMember = {
    mem_nome: 'apdateMember'
  }

  beforeEach(done => {
    Members
      .where('mem_codigo', '!=', '0')
      .destroy()
      .then(() => {
        Users
          .forge()
          .save(userAuth, {method: 'insert'})
          .then(user => {
            token = jwt.encode({usu_codigo: user.toJSON().usu_codigo}, jwtSecret)
            Members
              .forge()
              .save(defaultMember, {method: 'insert'})
              .then(member => {
                memCodigo = member.toJSON().mem_codigo
                done()
              })
          })
      })
  })
  describe('Route GET /members', () => {
    it('Should return a list de members', done => {
      request
        .get('/members')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].mem_nome).to.be.eql(defaultMember.mem_nome)
          done(err)
        })
    })
  })
  describe('Route GET /members/{id}', () => {
    it('Should return a member', done => {
      request
        .get(`/members/${memCodigo}`)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.mem_nome).to.be.eql(defaultMember.mem_nome)
          done(err)
        })
    })
  })
  describe('Route POST /members', () => {
    it('Shoud create a member', done => {
      request
        .post('/members')
        .set('Authorization', `JWT ${token}`)
        .send(newMember)
        .end((err, res) => {
          expect(res.body.mem_nome).to.be.eql(newMember.mem_nome)
          done(err)
        })
    })
  })
  describe('Route PUT /members/{id}', () => {
    it('Should update a member', done => {
      request
        .put(`/members/${memCodigo}`)
        .set('Authorization', `JWT ${token}`)
        .send(updateMember)
        .end((err, res) => {
          expect(res.body.mem_nome).to.be.eql(updateMember.mem_nome)
          done(err)
        })
    })
    describe('Route DELETE /members/{id}', () => {
      it('Should delete a member', done => {
        request
          .delete(`/members/${memCodigo}`)
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            expect(res.body).to.be.eql({})
            done(err)
          })
      })
    })
  })
})
