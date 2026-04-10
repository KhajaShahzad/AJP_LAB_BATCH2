const express=require("express");
const jwt = require("jsonwebtoken")
const app= express();
app.use(express.json());
const PORT=5000;
const SecretKey ="mysecretkey";

const user ={
    id:1,
    username: "admin",
    password:"1234"
};

app.post('/login',(req, res)=>{
    const {username,password}=req.body;

    if(username===user.username && password=== user.password){

        const token = jwt.sign(
            {id:user.id,name:user.username},
            SecretKey,
            {expiresIn:"1h"}
        );

        return res.json({token});
    }

    // moved outside if → now it actually works
    return res.status(401).json({message:"invalid details"});
});

function verifyToken(req, res, next){
    const authHeader=req.headers["authorization"];

    // added proper check (prevents crash)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"token missing"});
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,SecretKey,(err, decoded)=>{
        if(err){
            return res.status(403).json({message:"invalid token"});
        }

        req.user= decoded;
        next();
    });
}

app.get("/profile",verifyToken,(req,res)=>{
    res.json({
        message:"welcome to profile", // fixed typo
        user:req.user
    });
});

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));