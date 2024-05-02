const express = require("express");
const app = express()
const dotenv = require("dotenv");
const cors = require("cors");

const { errormiddleware } = require("./middleware/Error");
dotenv.config({path:"./config/config.env"});
require('./db/conn');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"

}))
app.use(cors(
    {origin:["http://localhost:5173"],
    credentials:true,
    
  }
))
const userrouter = require("./route/user.route")
app.use("/api/v1/user",userrouter)
app.use(errormiddleware)
app.listen(port,'0.0.0.0',(req,res)=>{
    console.log(`server is running on port ${port}`)
})