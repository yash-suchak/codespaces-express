import express from "express"
import urlRouter from "./routes/routes.js"
import viewRoutes from "./routes/viewRoutes.js"
import connectMongoDB from "./connection.js"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const port = process.env.PORT
const uri = process.env.MONGODB_URI

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Connection
connectMongoDB(uri)
  .then(console.log("MongoDb: Connection Successful"))
  .catch(err => console.log(`MongoDB: Connection failed, ${err}`))

//Set view engine
app.set("view engine","ejs")

//Middlewares
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routing
app.use("/homepage",viewRoutes)
app.use('/URL', urlRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
