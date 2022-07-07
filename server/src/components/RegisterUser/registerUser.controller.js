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

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('registerUser', email, password)

        // validate user input, all input fields required (double check)
        if (!(email && password)) {
            return res.status(400).send({ message: "All inputs are required" })
        }

        // check database 
        const response = await User.findOne({ email: email.toLowerCase() })

        if (response) {
            return res.status(409).send({ message: "User already exist" })
        }

        // if we are here, that means we have all inputs and the user can be registered (doesn't exist)
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user
        var user = await new User({
            email: email.toLowerCase(),
            password_hash: encryptedPassword,
            created_at: new Date(),
            workspaces: [],
            filesId: {},
            folderStructure: [],
            opened_filesId: {},
        }).save()

        // need to change to object because mongo returns mongo object and we can't attach token to it
        res.status(201).send({ success: `New user ${user} was created!` });
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
}