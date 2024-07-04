require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require('./db/connect')

// ! => routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

const notFoundMiddleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(express.static(path.join(__dirname, './public')))
// app.use(express.static(path.join(dir, '/frontend/dist')))
app.use(fileUpload())

// ! => routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(dir, 'frontend', 'dist', 'index.html'))
// })

// ! => error middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()