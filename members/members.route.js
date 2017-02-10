import MembersController from './members.controller'

export default (app) => {
  const membersController = new MembersController()
  app
    .route('/members')
    .all(app.auth.authenticate())
    .get((req, res) => {
      membersController
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .post((req, res) => {
      membersController
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
    })

  app
    .route('/members/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      membersController
      .getById(req.params.id)
      .then(response => res.status(response.statusCode).json(response.data))
      .catch(() => res.sendStatus(500))
    })
    .put((req, res) => {
      membersController
        .update(req.body, req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .delete((req, res) => {
      membersController
        .delete(req.params.id)
        .then(response => res.sendStatus(response.statusCode))
        .catch(() => res.sendStatus(500))
    })
}
