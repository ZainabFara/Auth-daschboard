//Här har jag ontrollerfunktioner för att hantera mina rutter.
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
   const {email, password, name} = req.body;

   try {
      if(!email || !password || !name) {
         throw new Error("All input are required")
      }

      const userAlreadyExists = await User.findOne({email});
      console.log("userAlreadyExists", userAlreadyExists);

      if(userAlreadyExists) {
         return res.status(400).json({success:false, message: "User already exists"});
      } 

      const hashedPassword = await bcrypt.hash(password,10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      const user = new User({
         email,
         password: hashedPassword,
         name,
         verificationToken,
         verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 timmar
     });
     

      await user.save();

      //jwt
      generateTokenAndSetCookie(res, user._id);

      res.status(201).json({
         succes: true,
         massage: "User created successfully",
         user: {
            ...user._doc,
            password: undefined
         },
      });

   } catch (error) {
     res.status(400).json({ sucess:false, message: error.message })
   }  
};

export const login = async (req, res) => {
    res.send("login route");
 }

 export const logout = async (req, res) => {
    res.send("logout route");
 }