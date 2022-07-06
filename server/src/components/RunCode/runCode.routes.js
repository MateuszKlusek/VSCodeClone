import express from "express"

const router = express.Router()

import { runCode } from "./runCode.controller.js"


router.post("/runCode", runCode)

export default router;