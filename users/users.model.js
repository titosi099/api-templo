import bcrypt from 'bcrypt'
import Bookshelf from '../config/db'

const Users = Bookshelf.Model.extend({
  tableName: 'usuarios',
  idAttribute: 'usu_codigo',
  initialize () {
    this.on('creating', (model) => {
      const salt = bcrypt.genSaltSync()
      model.set({
        usu_senha: bcrypt.hashSync('senha', salt)
      })
    })
  }
})

export default Bookshelf.model('Users', Users)
