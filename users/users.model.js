import Bookshelf from '../config/db'

const Users = Bookshelf.Model.extend({
  tableName: 'usuarios',
  idAttribute: 'usu_codigo'
})

export default Bookshelf.model('Users', Users)
