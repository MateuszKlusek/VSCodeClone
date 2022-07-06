import express from "express"

const router = express.Router()

import { deleteFiles } from "./deleteFiles.controller.js"


router.post("/deleteFiles", deleteFiles)

export default router;