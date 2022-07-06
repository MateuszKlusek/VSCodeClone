import express from "express"

const router = express.Router()

import { saveNewFile } from "./saveNewFile.controller.js"


router.post("/saveNewFile", saveNewFile)

export default router;