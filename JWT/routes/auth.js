const jwt = require('jsonwebtoken');

module.exports = function jwtauth(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        return res.send('access denied');
    } else{
        try{
            const verifiedUser = jwt.verify(token,process.env.AUTH_TOKEN);
            req.user = verifiedUser;
        } catch(err){
            res.status(400).send(err);
        }   
    }
    next();
}