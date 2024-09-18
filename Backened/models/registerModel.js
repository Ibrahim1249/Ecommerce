
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    uuid : {
        type : String,
        require : true,
        unique : true
    },
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password :{
        type : String,
        require : true,
    },
    role : {
        type : String,
        require : true,
    }
},{timestamps : true})

const registerModel = mongoose.model("userRegister",registerSchema)

module.exports = registerModel