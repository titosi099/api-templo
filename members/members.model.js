import Bookshelf from '../config/db'

const Members = Bookshelf.Model.extend({
  tableName: 'membros',
  idAttribute: 'mem_codigo'
})

export default Bookshelf.model('Members', Members)
