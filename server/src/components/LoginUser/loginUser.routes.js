import express from "express"

const router = express.Router()

import { loginUser } from "./loginUser.controller.js"


router.post("/loginUser", loginUser)

export default router;