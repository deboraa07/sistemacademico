import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const checkAuth = async (req,res,next) => {

    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({error: 'Access Denied'})
    }else{
/*         const tokenBody = token.slice(7) */
        jwt.verify(token,process.env.SECRET, (err,decoded) => {
            if(err){
                return res.status(401).json({err})
            }

            next();
        });
    }
}

export { checkAuth }