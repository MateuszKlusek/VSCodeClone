import express from "express"

const router = express.Router()

import { saveSingleFile } from "./saveSingleFile.controller.js"


router.post("/saveSingleFile", saveSingleFile)

export default router;