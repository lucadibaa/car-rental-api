import express from 'express'
import 'dotenv/config'
import deserializeUser from './middlewares/deserializeUser'
import routes from './routes'

const app = express()

app.use(deserializeUser)
app.use(express.json())

app.listen(5000, () => {
    console.log(`App is up and running at http://localhost:${5000}`)
    routes(app)
})
