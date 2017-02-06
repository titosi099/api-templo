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
}

export default UsersController
