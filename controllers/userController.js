import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import { RequestTooLongError } from "../errors/customErrors.js";


export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).exec();
  //REMOVING PASSWORD FROM DATA
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ users,jobs });
};
export const updateUser = async (req, res) => {
  //REMOVING PASSWORD FROM DATA
  const obj = { ...req.body };
  delete obj.password;

  if(!req.file) throw new RequestTooLongError("File not uploaded!, Please attach a jpeg file under 5MB")

  await User.findByIdAndUpdate(req.user.userId, {...obj,avatar:req.file.filename}, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: "user updated" });
};
