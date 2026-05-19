import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";


//USER REGISTRATION
export const register = async (req, res) => {
  //assiging admin role to the first created user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  //HASING PASSWORD
  req.body.password = await hashPassword(req.body.password);

  //registering user
  await User.create(req.body);
  return res.status(StatusCodes.CREATED).json({ message: "user created" });
};

//USER LOGIN
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({userId:user._id, role:user.role})

  const oneDay = 1000*60*60*24
  return res.status(StatusCodes.OK).cookie('token',token,{
    httpOnly:true,
    //Defening expiration one day after now
    expires: new Date(Date.now()+oneDay),
    //Secure feature ie, access from https only will be enabled for production
    secure:process.env.NODE_ENV === "production",
  }).json({message:"user logged in"});
};

export const logout = async (req,res) => {
  res.cookie('token','logout',{
    httpOnly:true,
    expires: new Date(Date.now())
  })
  return res.status(StatusCodes.OK).json({message:"user logged out"})
}