import app from './app'

const port = app.config.port

app.listen(port, () => {
  console.log(`Api running on port ${port}`)
})
