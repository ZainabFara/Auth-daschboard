import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verifictionToken: String,
    verificationsTokenexpiresAt: Date,
},{timestamps: true});

// Fälten "created" och "updated" kommer automatiskt att läggas till i dokumentet

export const User = mongoose.model("User", userSchema);  // vi exporterar detta för att använda det i ett anant fil.
