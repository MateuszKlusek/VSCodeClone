import express from "express"

const router = express.Router()

import { logout } from "./logout.controller.js"


router.get("/logout", logout)

export default router;