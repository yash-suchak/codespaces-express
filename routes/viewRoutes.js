import express from "express"
import URL from "../model/url.js"

const router = express.Router()

router.get("/", async (req,res) => {
  const urls = await URL.find({})
  const shortId = req.query.id;

  res.render("homepage",{
    urls,
    shortId
  })
}).get("/submit", (req,res) => {
  res.render("home")
})


export default router