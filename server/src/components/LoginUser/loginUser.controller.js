import User from "../../models/User.js"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
dotenv.config();

const generateAccessToken = (email) => {
    return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" })
}
const generateRefreshToken = (email) => {
    return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log('loginuser', email, password)

    // validate user input, all input fields required (double check)
    if (!(email && password)) {
        return res.status(400).send("all input is required")
    }

    // check database 
    const response = await User.findOne({ email: email.toLowerCase() })

    if (!response) {
        return res.status(401).send("No such user")
    }

    // if we are here, that means we have all inputs and the user exists in the database, now password check 
    const match = await bcrypt.compare(password, response.password_hash)
    if (match) {
        try {
            const accessToken = generateAccessToken(email.toLowerCase())
            const refreshToken = generateRefreshToken(email.toLowerCase())

            // need to change to object because mongo returns mongo object and we can't attach token to it
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.status(201).json(accessToken)
        } catch (err) {
            res.status(500).json({ 'message': err.message })
        }
    }
}