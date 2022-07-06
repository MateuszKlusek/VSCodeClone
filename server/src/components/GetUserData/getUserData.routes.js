import express from "express"

const router = express.Router()

import { getUserData } from "./getUserData.controller.js"


router.get("/getUserData", getUserData)

export default router;