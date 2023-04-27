import jwt from 'jsonwebtoken'

const FetchUser=(req,res,next)=>{
  const {authtoken}=req.body
  if(!authtoken){
    res.status(401).json({error:"Invalid Token"})
  }else{
    try {
        const data=jwt.verify(authtoken,process.env.SECRET_KEY)
        req.user=data.id
        
        next()
      } catch (error) {
        res.status(400).json({ error: err })
      }
  }
  
}

export default FetchUser
