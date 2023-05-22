const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')){
            throw new error;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token,process.env.JWT_SECRET);
        const {id} = decoded;
        req.user = {id};
        next();   
    }
    catch(error){
        res.status(401).json({msg:'LOG IN FIRST'})
    }
}

module.exports = auth;