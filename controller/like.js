import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getLike = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?"

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return console.log(err);
        return res.status(200).json(data.map(like => like.userId))
    })
}


export const addLike = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"
        
        const value = [
            userInfo.id,
            req.body.postId
        ]
        db.query(q, [value], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been liked")
        })
    })
}


export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` =?"
        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been disliked")
        })
    })
}