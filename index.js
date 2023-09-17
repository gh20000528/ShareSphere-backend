import express from 'express'

const app = express()

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comment.js'
import likeRoutes from './routes/like.js'

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/like", likeRoutes)

app.listen(8800 , ()=>{
    console.log("api working");
})