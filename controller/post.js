import { json } from 'express'
import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getPosts = (req, res) =>{
    const token = req.cookies.accessToken
    const userId = req.query.userId
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = userId !== "undefined" 
        ?`SELECT p.*, u.id AS userId, name, profilePic FROM post AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC` 
         :`SELECT p.*, u.id AS userId, name, profilePic FROM post AS p JOIN users AS u ON (u.id = p.userId) JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
    
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json(data)
        })
    })
}

export const addPost = (req, res) =>{
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "INSERT INTO post (`desc`, `img`, `createdAt`, `userId`) VALUES (?)"
        
        const value = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]
        db.query(q, [value], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been create")
        })
    })
}