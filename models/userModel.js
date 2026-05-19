import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["admin","user"],
    default: "user",
  },
  avatar:String,
  avatarPublicId : String
});

// RETURNING USERSCHEME WITHOUT PASSWORDIN VARIABLE toJSON
UserSchema.methods.toJSON = function(){
  let Obj = this.toObject();
  delete Obj.password;
  return Obj;
}

export default mongoose.model("User", UserSchema);
