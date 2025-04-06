import jwt from 'jsonwebtoken'

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];

    if(!token){
      res.status(402).json({
         message:"pls login"
      })
    }

    const decode = await jwt.verify(token,process.env.SECRETE_KEY_ACCESS_TOKEN)

    if(!decode){
      return res.status.json({
         message:"Unathorized access",
         
      })
    }
   req.userId = decode.id

    next();
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
    });
  }
};

export default Auth;
