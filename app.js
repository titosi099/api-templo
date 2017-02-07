import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import membersRoute from './members/members.route'
import usersRoute from './users/users.router'

const app = express()
app.config = config

app.use(bodyParser.json())

membersRoute(app)
usersRoute(app)

export default app
