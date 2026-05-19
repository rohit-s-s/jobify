import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors/customErrors.js";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password,10)
  } catch (error) {
    console.error(error)
    throw new BadRequestError('Failed hashing')
  }
};

// Comparing login and hassed passwords
export const comparePassword = async (password, hash) => {
  const isMatch = await bcrypt.compare(password,hash)
  return isMatch
}