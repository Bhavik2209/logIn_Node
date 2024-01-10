const express = require("express");
const https = require("https");
const bodyParser =  require("body-parser");
const path = require("path");
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const collection = require("./mongoDB");


app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.post("/signup",async(req,res)=>{
    const data = {
        email:req.body.email,
        password:req.body.password

    }
    await collection.insertMany([data]);
    res.render("home");
})

app.post("/login",async(req,res)=>{
    try{
        const check =  await collection.findOne({email:req.body.email})
        if(check.password === req.body.password){
            res.render("Home");
        }else{
            res.send("Wrong password");
        }
    }catch{
        res.send("sign up first");
    }
    
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})