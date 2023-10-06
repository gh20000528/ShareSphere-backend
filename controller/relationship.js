import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getRelationship = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?"

    db.query(q, [req.query.followedUserId], (err, data) => {
        if(err) return console.log(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId))
    })
}


export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)"
        
        const value = [
            userInfo.id,
            req.body.userId
        ]
        
        db.query(q, [value], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been liked")
        })
    })
}


export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.stats(401).json("not logged in")
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.stats(403).json("Token is not valid")

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` =?"
        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if(err) return console.log(err);
            return res.status(200).json("post has been disliked")
        })
    })
}