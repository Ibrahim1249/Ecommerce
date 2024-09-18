const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
dotenv.config()
const app = express();

const port = process.env.PORT || 3000

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log("server running on port" , port)
    })
}).catch((error)=>{
    console.log(error.message)
})

app.use("/api/v1",authRouter)
