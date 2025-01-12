const mongoose=require("mongoose")

// mongoose.connect("mongodb://localhost:27017/personalinfo")

mongoose.connect("mongodb+srv://park:12345@cluster0.wyv0t.mongodb.net/personalinfo")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('info',logInSchema)

module.exports=LogInCollection