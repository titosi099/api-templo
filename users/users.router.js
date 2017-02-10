import UsersController from './users.controller'

export default app => {
  const usersController = new UsersController()
  app
    .route('/users')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .post((req, res) => {
      usersController
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })

  app
    .route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController
        .getById(req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .put((req, res) => {
      usersController
        .update(req.body, req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .delete((req, res) => {
      usersController
        .delete(req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
}
