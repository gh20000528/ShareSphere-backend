import {db} from '../connect.js'
import bcryptjs from 'bcryptjs'

export const login = (req, res) => {

}

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json('User already exists')
    
        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)"

        const value = [
            req.body.username, 
            req.body.email,
            hashedPassword,
            req.body.name
        ]

        db.query(q, [value], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).json('User has been created')
        })
    })
}

export const logout = (req, res) => {
    
}