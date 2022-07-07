import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.header['authorization']

    if (!authHeader) {
        console.log("not authorized")
        return res.status(401).send("A token is required for authentication.")
    }
    console.log(authHeader) // Bearer token
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token, process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403) // invalid token
            req.email = decoded.email
            next()
        }
    )
}