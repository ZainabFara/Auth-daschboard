import jwt from "jsonwebtoken";  // Det här för att skapa och verifiera tokens

// Funktion för att generera JWT-token och sätta den som en cookie
export const generateTokenAndSetCookie = (res, userId) => {
    //Skapa en JWT-token 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "9d",
    });
    
    // Sätter Jwt-token som en cookie i responsen
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Cookies skickas endast över HTTPS i produktionsläge
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return token;
};
