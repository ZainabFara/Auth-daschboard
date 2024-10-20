import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: "9d",
    })

    res.cookie("token", token, {
        httpOnly: true, //xss
        secure: process.env.NODE_ENV === "production", 
         sameSite:"strict", //csrf
         maxAge: 15 * 24 * 60 * 1000,
    })

    return token;
};