import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if (errorMessage[0].startsWith("not auth")) {
          throw new UnauthorizedError("not authorized");
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInputs = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status type"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

//if the moongoose.Type.ObjectId returns true then no errr otherwise the error message will be displayed
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, {req}) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(value);
    if (!isIdValid) {
      throw new Error("invalid MongoDB id");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`no job found for the id ${value}`);
    }
    //Checking if user is authorized to access the jobs data
    const isAdmin = req.user.role === "admin"
    const isOwner = req.user.userId === job.createdBy.toString()
    if(!isAdmin && !isOwner) throw new UnauthorizedError("not authorized")
  }),
]);

//Validation for login
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter a valid email id"),
  body("password").notEmpty().withMessage("password is required"),
]);

//Validation for user register
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter a valid email id")
    .custom(async (email) => {
      const user = await User.findOne({ email }).exec();
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Provide a minimum characters of 8 letters for password"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

//Validation for user update
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter a valid email id")
    .custom(async (email, {req}) => {
      const user = await User.findOne({ email }).exec();
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
