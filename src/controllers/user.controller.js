import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - !empty
  //check if user already exist: username , email
  //check for images
  //upload them to cloudinary, avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  // return res

  const { fullname, email, password, username } = req.body;
  console.log("email :", email, "password :", password);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw ApiError(409, "User with email or username already existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log("files");

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const uploadOnCloudinary = await uploadOnCloudinary(avatarLocalPath);
});

export { registerUser };
