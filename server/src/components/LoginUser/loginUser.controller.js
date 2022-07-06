import User from "../../models/User.js"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
dotenv.config();


const generateAccessToken = (email) => {
    return jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1800s" })
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)

        // validate user input, all input fields required (double check)
        if (!(email && password)) {
            return res.status(400).send("all input is required")
        }
        // check database 
        var user = await User.findOne({ email: email.toLowerCase() })

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            // create token
            const token = generateAccessToken(email.toLowerCase())
            // need to change to object because mongo returns mongo object and we can't attach token to it
            user = user.toObject()
            user.token = token
            return res.status(200).json(user)
        }
        res.status(401).send("invalid Credentials")
    }
    catch (err) {
        console.log(err)
    }
}