import bookshelf from 'bookshelf'
import knex from 'knex'
import config from './config'

const Bookshelf = bookshelf(knex(config.bookshelfConfig))

Bookshelf.plugin('registry')
Bookshelf.plugin('pagination')

export default Bookshelf

