import MembersController from './members.controller'

export default (app) => {
  const membersController = new MembersController()
  app
    .route('/members')
    .get((req, res) => {
      membersController
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
}
