import express from 'express'

const app = express()

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comment.js'
import likeRoutes from './routes/like.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3001",
}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/like", likeRoutes)

app.listen(8800 , ()=>{
    console.log("api working");
})