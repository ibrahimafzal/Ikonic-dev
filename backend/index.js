const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dbConnect = require("./config/dbConnect")

// import routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require("./routes/postRoutes")

require("dotenv").config()

// import error handler middleware 
const { notFound, errorHandler } = require("./middlewares/errorHandler")

// import mongoDB connection
dbConnect()


// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// ROUTES
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("SERVER RUNNING")
})