import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello to Memories API')
})

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const CONNECTION_URL =
  'mongodb+srv://techandy42:12ze6us03@cluster0.lpwbf.mongodb.net/memoriesDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
