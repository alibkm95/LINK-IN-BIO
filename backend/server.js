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
const linkRouter = require('./routes/linkRoutes')
const ticketRouter = require('./routes/ticketRoutes')
const notificationRouter = require('./routes/notificationRoutes')
const reportRouter = require('./routes/reportRoutes')
const fileRouter = require('./routes/fileRoutes')
const analyticsRouter = require('./routes/analyticsRoutes')

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
app.use('/api/link', linkRouter)
app.use('/api/ticket', ticketRouter)
app.use('/api/notif', notificationRouter)
app.use('/api/report', reportRouter)
app.use('/api/file', fileRouter)
app.use('/api/stat', analyticsRouter)

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