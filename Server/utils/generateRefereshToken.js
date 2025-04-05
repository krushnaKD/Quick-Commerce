import jwt from "jsonwebtoken";
import Usermodel from "../models/userModel.js";

const generaterefereshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRETE_KEY_REFERESH_TOKEN,
    { expiresIn: "7d" }
  );

  const UpdateRefereshToken = await Usermodel.findOne(
    { _id: userId },
    {
        refresh_token: token,
    }
  );
};

export default generaterefereshToken;
