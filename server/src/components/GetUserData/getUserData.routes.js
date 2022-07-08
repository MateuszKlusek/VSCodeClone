import express from "express"

const router = express.Router()

import { getUserData } from "./getUserData.controller.js"


router.post("/getUserData", getUserData)

export default router;