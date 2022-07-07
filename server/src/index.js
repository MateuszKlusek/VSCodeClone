import express, { application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express()

// import middlewares
import { verifyToken } from "./middlewares/auth.js"

// config
import { mongoose } from "./config/mongoDB.js"

// variables
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())
// app.use(verifyToken)

// routes
import getUserData from "./components/GetUserData/getUserData.routes.js"
import saveSingleFile from "./components/saveSingleFile/saveSingleFile.routes.js"
import runCode from "./components/RunCode/runCode.routes.js"
import registerUser from "./components/RegisterUser/registerUser.routes.js"
import loginUser from "./components/LoginUser/loginUser.routes.js"
import saveNewFile from "./components/SaveNewFile/saveNewFile.routes.js"
import deleteFiles from "./components/DeleteFiles/deleteFiles.routes.js"



app.use("/", loginUser)
app.use("/", registerUser)
// app.use("/", refresh)
// app.use("/", logout)


// app.use(verifyToken)

app.use("/", getUserData)
app.use("/", saveSingleFile)
app.use("/", saveNewFile)
app.use("/", deleteFiles)
app.use("/", runCode)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} for MasterVim.`)
})