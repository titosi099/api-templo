import bcrypt from 'bcrypt'
import Promisse from 'bluebird'
import Bookshelf from '../config/db'

const Users = Bookshelf.Model.extend({
  tableName: 'usuarios',
  idAttribute: 'usu_codigo',
  initialize () {
    this.on('creating', this.hashPassword, this)
  },
  hashPassword (model) {
    return new Promisse((resolve, reject) => {
      bcrypt.hash(model.attributes.usu_senha, 10, (err, hash) => {
        if (err) reject(err)
        model.set({usu_senha: hash})
        resolve(hash)
      })
    })
  },
  isPassword (encodedPassword, password) {
    return new Promisse((resolve, reject) => {
      bcrypt.compare(password, encodedPassword, (err, match) => {
        if (err) reject(err)
        resolve(match)
      })
    })
  }
})

export default Bookshelf.model('Users', Users)
