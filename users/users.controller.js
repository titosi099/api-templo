import Users from './users.model'

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
})

const errorResponse = (message, statusCode) => defaultResponse({
  error: message
}, statusCode)

class UsersController {
  constructor () {
    this.Users = Users
  }
  getAll () {
    return this.Users
      .fetchAll()
      .then(result => {
        if (!result.toJSON().length) return defaultResponse({}, 204)
        return defaultResponse(result.toJSON())
      })
      .catch(err => errorResponse(err.message, 422))
  }

  getById (idUser) {
    return this.Users
      .where({usu_codigo: idUser})
      .fetch()
      .then(result => {
        if (!result) return defaultResponse({}, 204)
        return defaultResponse(result.toJSON())
      })
      .catch(err => errorResponse(err.message, 422))
  }

  create (data) {
    return this.Users
      .forge()
      .save(data, {method: 'insert'})
      .then(result => defaultResponse(result.toJSON()))
      .catch(err => errorResponse(err.message, 422))
  }

  update (data, idUser) {
    return this.Users
      .forge()
      .where({usu_codigo: idUser})
      .save(data, {method: 'update'})
      .then(result => defaultResponse(result.toJSON()))
      .catch(err => errorResponse(err.message, 422))
  }

  delete (idUser) {
    return this.Users
      .where({usu_codigo: idUser})
      .destroy()
      .then(result => defaultResponse(result.toJSON(), 204))
      .catch(err => errorResponse(err.message, 422))
  }
}

export default UsersController
