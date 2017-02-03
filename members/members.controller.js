import Members from './members.model'

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
})

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode)

class MembersController {
  constructor () {
    this.Members = Members
  }

  getAll () {
    return this.Members
      .fetchAll()
      .then(result => {
        if (!result.toJSON().length) return defaultResponse({}, 204)
        return defaultResponse(result.toJSON())
      })
      .catch(err => errorResponse(err.message, 422))
  }

  getById (idMember) {
    return this.Members
      .where({mem_codigo: idMember})
      .fetch()
      .then(result => {
        if (!result) return defaultResponse({}, 204)
        return defaultResponse(result.toJSON())
      })
      .catch(err => errorResponse(err.message, 422))
  }

  create (data) {
    return this.Members
      .forge()
      .save(data, {method: 'insert'})
      .then(result => defaultResponse(result.toJSON()))
      .catch(err => errorResponse(err.message, 422))
  }

  update (data, idMember) {
    return this.Members
      .forge()
      .where({mem_codigo: idMember})
      .save(data, {method: 'update'})
      .then(result => defaultResponse(result.toJSON()))
      .catch(err => errorResponse(err.message, 422))
  }

  delete (idMember) {
    return this.Members
      .where({mem_codigo: idMember})
      .destroy()
      .then(result => defaultResponse(result.toJSON(), 204))
      .catch(err => errorResponse(err.message, 422))
  }
}

export default MembersController
