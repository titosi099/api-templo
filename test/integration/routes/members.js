import Members from '../../../members/members.model'

describe('Routes Members', () => {
  let memCodigo
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
        Members
          .forge()
          .save(defaultMember, { method: 'insert' })
          .then(member => {
            memCodigo = member.toJSON().mem_codigo
            done()
          })
      })
  })
  describe('Route GET /members', () => {
    it('Should return a list de members', done => {
      request
        .get('/members')
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
          .end((err, res) => {
            expect(res.body).to.be.eql({})
            done(err)
          })
      })
    })
  })
})
