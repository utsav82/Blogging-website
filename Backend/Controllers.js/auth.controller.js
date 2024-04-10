import User from "../Models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
export const signup = asyncHandler( async(req,res)=>{
const {userName,email,password}=req.body;
console.log(userName)
console.log(email)
console.log(password)
if ([userName,email,password].some((e) => e?.trim() === "")) {
  throw new ApiError(404, "All fields are required");
  }

const userIsExisting = await User.findOne({ $or: [ {userName} ,{ email }] });
if(userIsExisting){
throw  new ApiError(402,"User Already Exist")
}
const user = await User.create({
    email,
    password,
    userName: userName.toLowerCase(),
  });
  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    new ApiError(500, "Something went Wrong While registering");
  }
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      createdUser,
      "User Logged In SuccessFully"
    )
  );
}
)
