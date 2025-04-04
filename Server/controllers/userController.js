import sendemail from "../config/resend";
import Usermodel from "../models/userModel";
import bcrypt from "bcrypt"
export const registerUserController = async (req, res) => {

try {
    const {name ,email, password} = req.body

    if(!name||!email||!password){
        return res.status(500).json({
            message:"name email and the password should be there"
        })
    }

    const user = await Usermodel.findOne({email})

    if(user){
        return res.status(400).json({
            message:"user exists new email should use for another account"
        })
    }

    const passhash = await bcrypt.hash(password,10);

    const payload = {
        name,
        email,
        password:passhash,
    }

    const newUser = new Usermodel(payload);
    await newUser.save()

    const verfiyEmail = await sendemail({
        sendTo:email,
        subject:"verify email from blinkit",
        
    })
    
} catch (error) {
    res.status(400).json({
        message:error.message
    })
}

};
