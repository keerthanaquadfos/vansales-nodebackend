require('dotenv').config();
const privateKey=process.env.PRIVATE_KEY; 
const jwt = require('jsonwebtoken'); 
module.exports.authorize = function(req, res, next) {
    let token = req.headers['Authorization'] || req.headers['x-access-token'];			 
    if(token){ 
        const splitted=  token.split(' ');
        token =splitted[1];  
        jwt.verify(token, privateKey, (err, decoded) => {  
        if(err){
            res.status(401).json({
                result : false,
                message : "Invalid access token!"
            })
        } 
        else {		
            req._id= splitted[2];        
            next()
        } 
        }) 
    } else {
        res.status(400).json({
            result : false,
            message : "Token missing"
        })
    } 
}