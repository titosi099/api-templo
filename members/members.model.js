import Bookshelf from '../config/db'

const Members = Bookshelf.Model.extend({
  tableName: 'membros'
})

export default Bookshelf.model('Members', Members)
