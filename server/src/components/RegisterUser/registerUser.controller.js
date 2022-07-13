// models
import User from "../../models/User.js"

// packaes
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

// import .env variables
dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // validate user input, all input fields required (double check)
        if (!(email && password)) {
            return res.status(400).send({ message: "All input fields are required" })
        }

        // check database 
        const response = await User.findOne({ email: email.toLowerCase() })

        if (response) {
            return res.status(409).send({ message: "User already exist" })
        }

        // if we are here, that means we have all inputs and the user can be registered (doesn't exist)
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user
        // save refresh token with login 
        // maybe change into register to, if refactor later to login with register action
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
        res.status(201).send({ success: `New user '${user.email}' was created!` });
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
}