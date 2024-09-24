const jwt = require("jsonwebtoken")

function generateToken(payload){
    return jwt.sign(payload , process.env.SECRET_KEY ,{ expiresIn: '1h' })
}

function jwtMiddleware(req,res,next){
     const authHeader = req.headers.authorization;
     const token = authHeader && authHeader.split(" ")[1];

     if(token == null) return res.status(401).json({error : "Access denied. No token provided"});

     try{
         const decodedToken = jwt.verify(token , process.env.SECRET_KEY);
         req.user = decodedToken;
         next() 
     }catch(error){
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({error : 'Token expired. Please log in again.'});
          }
          if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({error : 'Invalid token. Please log in again.'});
          }
          return res.status(400).json({error : 'Invalid token.'});
     }
}

module.exports = {
    generateToken,
    jwtMiddleware
}