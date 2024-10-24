//Här har jag kontrollerfunktioner för att hantera mina rutter.
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from '../mailtrap/emails.js';

//funktion för att hantera registering av nya användare
export const signup = async (req, res) => {
   const {email, password, name} = req.body;

   try {
      //kontrollera att alla fält är ifyllda
      if(!email || !password || !name) {
         throw new Error("All input are required")
      }

      //Kolla om användaren redan finns i databasen
      const userAlreadyExists = await User.findOne({email});
      console.log("userAlreadyExists", userAlreadyExists);


      // Om användaren redan finns, skicka ett felmeddelande 
      if(userAlreadyExists) {
         return res.status(400).json({success:false, message: "User already exists"});
      } 

      // Hasha lösenordet med bcrypt för att spara det säkert 
      const hashedPassword = await bcrypt.hash(password,10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generera en verifieringkod för e-postverifiriering

      //Skapa en ny användare med verifieringskod och spara i databasen
      const user = new User({
         email,
         password: hashedPassword,
         name,
         verificationToken,
         verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 timmar
     });
     
      // Spara användaren i databasen
      await user.save(); 

      //Skapa JWT-token och sätt den i en cookie
      generateTokenAndSetCookie(res, user._id);
      
      //Skicka verifieringsmail till användaren
      await sendVerificationEmail(user.email, verificationToken);
   
      // Svara med en lyckad respons och skicka användardata utan lösenord
      res.status(201).json({
         succes: true,
         massage: "User created successfully",
         user: {
            ...user._doc,
            password: undefined // exkludera lösenordet från svaret
         },
      });

   } catch (error) {
     res.status(400).json({ sucess:false, message: error.message })
   }  
};

export const verifyEmail = async (req, res) => {
   // 1 2 3 4 5 6
   const {code} = req.body;
   try {
     const user = await user.findOne( {
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now()}
     })

     if(!user) {
        return res.status(400).json({sucess: false, message: "Invalid or expired verification code"})
     }

     user.isVerified = true;
     user.verificationToken = undefined;
     user.verificationTokenExpiresAt = undefined;
     await user.save();

     await sendWelcomeEmail(user.email, user.name);

   } catch (error) {

   }
}

// Placeholder (ännu inte implementerad)
export const login = async (req, res) => {
    res.send("login route");
 }

 export const logout = async (req, res) => {
    res.send("logout route");
 }