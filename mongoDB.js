const mongoose = require("mongoose"); 

mongoose
.connect('mongodb://127.0.0.1:27017/log-in-db')
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("connected");
});

const LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection = new mongoose.model("collection1",LoginSchema);

module.exports = collection;