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
}

export default MembersController
