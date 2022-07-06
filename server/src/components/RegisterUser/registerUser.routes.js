import express from "express"

const router = express.Router()

import { registerUser } from "./registerUser.controller.js"


router.post("/registerUser", registerUser)

export default router;