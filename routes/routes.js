import express from "express"
import {handleRedirect, handleNewURL, handleAnalytics} from "../controller/urlController.js"

const router = express.Router();

router
    .get("/:shortId", handleRedirect)
    .get("/analytics/:shortId", handleAnalytics)
    .post("/", handleNewURL)

export default router