import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import membersRoute from './members/members.route'

const app = express()
app.config = config

app.use(bodyParser.json())

membersRoute(app)

export default app
