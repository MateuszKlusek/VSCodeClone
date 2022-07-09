import express, { application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import fs from "fs"
import path from "path"

const app = express()

// import middlewares
import { verifyToken } from "./middlewares/auth.js"

// config
import { mongoose } from "./config/mongoDB.js"

// variables
const PORT = process.env.PORT || 5001;


// create a write stream (in append mode)
const serverPath = process.cwd()
var accessLogStream = fs.createWriteStream(`${serverPath}/src/logs/access.log`, { flags: 'a' })


// middlewares
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }))
app.use(cookieParser())

// routes
import getUserData from "./components/GetUserData/getUserData.routes.js"
import saveSingleFile from "./components/saveSingleFile/saveSingleFile.routes.js"
import runCode from "./components/RunCode/runCode.routes.js"
import registerUser from "./components/RegisterUser/registerUser.routes.js"
import loginUser from "./components/LoginUser/loginUser.routes.js"
import saveNewFile from "./components/SaveNewFile/saveNewFile.routes.js"
import deleteFiles from "./components/DeleteFiles/deleteFiles.routes.js"
import refresh from "./components/Refresh/refresh.routes.js"
import logout from "./components/LogOut/logout.routes.js"



app.use("/", loginUser)
app.use("/", registerUser)
app.use("/", refresh)
app.use("/", logout)


app.use(verifyToken)

app.use("/", getUserData)
app.use("/", saveSingleFile)
app.use("/", saveNewFile)
app.use("/", deleteFiles)
app.use("/", runCode)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} for MasterVim.`)
})



