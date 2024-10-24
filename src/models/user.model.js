import mongoose from "mongoose"

const userCollection = "usuarios"

const userSchema= new mongoose.Schema({
    first_name: {type:String, required:true, max:20},
    last_name:{type:String, required:true, max:20},
    email:{type:String, required:true, unique:true},
    role:{type:String, required:true, default:"user"},
    password:{type:String, required:true},
})

const User = mongoose.model(userCollection, userSchema)

export default User