import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getComment = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comment AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return console.log(err);
        return res.status(200).json(data)
    })
}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "INSERT INTO comment (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)"
        
        const value = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]
        db.query(q, [value], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been create")
        })
    })
}