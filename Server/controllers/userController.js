import sendemail from "../config/resend.js";
import Usermodel from "../models/userModel.js";
import bcrypt from "bcrypt";
import verfiyEmailTemplete from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generaterefereshToken from "../utils/generateRefereshToken.js";
import uploadImageCloud from "../utils/uploadimage.js";
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({
        message: "name email and the password should be there",
      });
    }

    const user = await Usermodel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "user exists new email should use for another account",
      });
    }

    const passhash = await bcrypt.hash(password, 10);

    const payload = {
      name,
      email,
      password: passhash,
    };

    const newUser = new Usermodel(payload);
    await newUser.save();

    const verfiyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    const verfiyEmail = await sendemail({
      sendTo: email,
      subject: "verify email from blinkit",
      html: verfiyEmailTemplete({ name, url: verfiyEmailUrl }),
    });

    return res.json({
      message: "Register Succesfully !",
      error: false,
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function verifyemailController(req, res) {
  try {
    const { code } = req.body;

    const user = await Usermodel.findById({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const updateUser = await Usermodel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "user Verified ",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
    });
  }
}

//login api

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user is not register",
      });
    }
    if (user.status !== "Active") {
      return res.status(402).json({
        message: "Your email Maybe Inactive or Suspend pls contact the Admin",
      });
    }

    const checkpass = await bcrypt.compare(password, user.password);

    if (!checkpass) {
      res.status(400).json({
        message: "Password is Wrong",
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refereshToken = await generaterefereshToken(user._id);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refereshToken", refereshToken, cookieOption);

    return res.json({
      message: "Login Sucessfully !",
      data: {
        accessToken,
        refereshToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
    });
    console.log(error);
  }
}

//logout Api

export async function logoutuser(req, res) {
  try {
    const userId = req.userId;

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refereshToken", cookieOption);

    const removeRefereshToken = await Usermodel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    res.json({
      message: "LogOut Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
    });
  }
}

//upload image

export async function uploadAvtar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;
    const upload = await uploadImageCloud(image);

    const updateUser = await Usermodel.findByIdAndUpdate(userId,{
      Avatar : upload.url
    })

    return res.json({
      message: "uploaded",
      data: {
        _id:userId,
        url:upload.url
      },
    });
  } catch (error) {
    res.json({
      message: error.message || error,
    });
  }
}
