// models
import User from "../../models/User.js"

// packages
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// import .env variables
dotenv.config();

export const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(200).send({ email: "", accessToken: "", isAuth: false });
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.status(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.status(403);
            const accessToken = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.status(200).send({ email: foundUser.email, accessToken: accessToken, isAuth: true })
        }
    );
}