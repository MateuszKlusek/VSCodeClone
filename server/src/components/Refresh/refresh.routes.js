import express from "express"

const router = express.Router()

import { refresh } from "./refresh.controller.js"


router.get("/refresh", refresh)

export default router;