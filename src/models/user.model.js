import mongoose, { Schema } from "mongoose";

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
        fullname:{
            type: String,
            required: true,
            trim: true,
            index: true
        }
}
)


export const User = mongoose.model("User",userSchema)