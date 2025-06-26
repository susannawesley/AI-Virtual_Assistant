import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        console.log("JWT_SECRET (isAuth):", process.env.JWT_SECRET); // Add this
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()
    } catch (error) {
        console.log(error) // This will now log the actual JWT error
        return res.status(500).json({message:"is Auth error"})
    }
}
export default isAuth