import express from "express"

const router = express.Router()

import { saveFolderStructure } from "./saveFolderStructure.controller.js"


router.post("/saveFolderStructure", saveFolderStructure)

export default router;