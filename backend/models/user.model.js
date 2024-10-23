import mongoose from "mongoose";

// Definera schemat för en användare i databasen
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
    resetPasswordToken: String, //Token för återställning av lösenord
    resetPasswordExpiresAt: Date, // Utgångsdatum för återställningstoken
    verificationToken: String, // Token för verifiering av e-post
    verificationsTokenexpiresAt: Date, 
},{timestamps: true});

// Fälten "created" och "updated" kommer automatiskt att läggas till i dokumentet

export const User = mongoose.model("User", userSchema);  // jag exporterar detta för att använda det i ett anant fil.
