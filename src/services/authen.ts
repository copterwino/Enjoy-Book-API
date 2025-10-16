import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { RoleStatus } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const loginService = async (email: string, user_pwd: string) => {
    const user = await User.findOne({where: {email}});
    if(!user) throw new Error("ชื่อผู้ใช้หรือรหัสผ่านผิด");

    const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);
    if(!isPasswordValid) throw new Error("ชื่อผู้ใช้หรือรหัสผ่านผิด");

    const payload = {id: (user as any).id, role: (user as any).role};
    const token = jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});

    return{
        message: "login success",
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            role: user.role
        }
    };
};

export const registerService = async (
    email: string,
    fullname: string,
    user_pwd: string,
    role?: RoleStatus,
) => {
    const existingEmail = await User.findOne({
        where : {email}
    });
    if (existingEmail) throw new Error("อีเมลนี้ถูกใช้ไปแล้ว");

    const hashedPassword = await bcrypt.hash(user_pwd,10);
    const newUser = await User.create({
        email,
        user_pwd: hashedPassword,
        fullname,
        role: role || RoleStatus.USER,
        

    });
    return {
        message: "Register success",
        user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        },
    };
};