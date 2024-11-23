import mongoose, { Schema } from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from bcrypt

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique : true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            true: true
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,  //cloudinary url going to use
            required: true,
            
        },
        coverImage: {
            type : String, 

        },
        WatchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken:{
            type: String,

        },
    },
    {timestamps: true}
)

// PASSWORD ENCRYPTION

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jsonwebtoken.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
process.env.ACCES_TOKEN_SECRET,{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}
userSchema.methods.generateRefreshToken = function(){
    jsonwebtoken.sign({
        _id: this._id,   
    },
process.env.REFRESH_TOKEN_SECRET,{              
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}


export const User = mongoose.model("User",userSchema)