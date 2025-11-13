import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next)=>{

    const {token} = req.headers ;
    if(!token) return res.json({success : false , message: "Not Authorized"});
    
    const jwtSecret = process.env.JWT_S;
    if (!jwtSecret) {
        console.error('JWT_S environment variable is not set');
        return res.json({success : false , message: "Server configuration error: JWT secret not set"});
    }
    
    try {

        const tokenDecode = jwt.verify(token , jwtSecret);
        req.body.userId = tokenDecode.id ;
        console.log("token:" , tokenDecode , "body : " , req.body.userId )
        next()
        
    } catch (error) {
        console.log(error)
        return res.json({success : false , message: error.message || "Invalid token"});
        
    }

}


export default authMiddleware;