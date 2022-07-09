import User from "../../models/User.js"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
dotenv.config();


// token generators
const generateAccessToken = (email) => {
    return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
}

const generateRefreshToken = (email) => {
    return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body

    // validate user input, all input fields required (double check)
    if (!(email && password)) {
        return res.status(400).send({ message: "All input fields are required" })
    }

    // check database 
    const foundUser = await User.findOne({ email: email.toLowerCase() })

    if (!foundUser) {
        return res.status(401).send({ message: "No such user" })
    }

    // if we are here, that means we have all inputs and the user exists in the database, now password check 
    const match = await bcrypt.compare(password, foundUser.password_hash)
    if (match) {
        try {
            const accessToken = generateAccessToken(email.toLowerCase())
            const refreshToken = generateRefreshToken(email.toLowerCase())

            // update/save refresh token to database
            foundUser.refreshToken = refreshToken
            const result = await foundUser.save()

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.status(201).send({ accessToken })
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    } else {
        res.status(401).send({ message: "Password is not a match" })
    }
}