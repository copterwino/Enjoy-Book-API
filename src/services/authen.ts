import bcrypt from "bcryptjs";
import User from "../models/user";
import { RoleStatus } from "../models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface AuthResult{
    success: boolean;
    message: string;
    data?:{
        id: number;
        email: string;
        fullname?: string;
        role: RoleStatus;
        token?: string;
    }
}

//REGISTER SERVICE
export const registerService = async (
    email: string,
    fullname: string,
    user_pwd: string,
    role?: RoleStatus,
): Promise<AuthResult> => {
    const existingEmail = await User.findOne({ where : {email} });

    if (existingEmail){
        return {
            success: false,
            message: "อีเมลนี้ถูกใช้งานไปแล้ว"
        };
    };

    const hashedPassword = await bcrypt.hash(user_pwd, 10);

    const newUser = await User.create({
        email,
        fullname,
        user_pwd: hashedPassword,
        role: role || RoleStatus.USER,
    });

    return {
        success: true,
        message: "สมัครสมาชิกสำเร็จ",
        data: {
            id: newUser.id,
            email: newUser.email,
            fullname: newUser.fullname,
            role: newUser.role,
        },
    };
};

//LOGIN SERVICE
export const loginService = async (
    email: string, user_pwd: string
): Promise<AuthResult> => {
    const user = await User.findOne({where: {email}});

    if(!user){
        return {
            success: false,
            message: "ไม่พบผู้ใช้งานนี้ในระบบ"
        }
    }

    const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);

    if(!isPasswordValid){
        return {
            success: false,
            message: "ชื่อผู้ใช้หรือรหัสผ่านผิด"
        };
    }

    //const payload = {id: (user as any).id, role: (user as any).role};
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn:"7d" }
    );

    return{
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
        data: {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            token
        }
    };
};
