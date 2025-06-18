const User = require("../models/User"); 


const auth = async (req , res , next)=>{
    if(req.cookies.Token){
        const id = req.cookies.Token;
        const user = await User.findById(id);
        if(user){
            req.user = user;
            next();
        }else{
            // res.send('Token you have is not valid');
            next();
        }
    }else{
        // res.send("You are not a valid user.");
        next()
    }
}

module.exports = auth;