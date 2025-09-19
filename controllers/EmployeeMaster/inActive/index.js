const express=require('express')
const dbData=require("./database")
dbData();
const app=express()
require("dotenv").config();
const PORT=process.env.PORT||5000;
// import route
const createData=require("./routes")
app.use("/api/v1",createData)
app.get("/",(req,res)=>{
    res.send(`<h1>jai shree ram</h1>`)
})
app.listen( PORT,()=>{
    console.log(`app lister server port number is {PORT}`);
})