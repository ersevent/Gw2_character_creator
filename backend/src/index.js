import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import path from 'path'

import api from './routes/api.js'

dotenv.config()

const app = express()

const csrfProtection = csrf({ cookie: true, })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(csrfProtection)

app.use('/api', api)
app.use('/api/files', express.static(path.join(path.dirname('.'), 'upload')))


const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME, PORT } = process.env

const initDB = async () => {
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: DB_NAME,
    }
  )

  mongoose.connection
    .once('open', () => {
      console.info('Connected to MongoDB')
    })
    .on('error', (error) => {
      console.error('MongoDB connection error: ', error)
    })
}

initDB()

app.use((err, req, res, next) => {
  res.status(500).json({ message: err })
})

app.listen(PORT, () => {
  console.info(`Server listening on localhost:${PORT}`)
})
