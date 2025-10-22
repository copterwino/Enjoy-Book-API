import bcrypt from "bcryptjs";
import User from "../models/user_old.model";
import { RoleStatus } from "../models/user_old.model";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET || "fallback_secret";
const AUTH_REFRESH_SECRET = process.env.AUTH_REFRESH_SECRET || "fallback_refresh_secret";

//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface AuthResult{
    success: boolean;
    code: number;
    status: string;
    message: string;
    data?:{
        user_id: number;
        email: string;
        fullname?: string;
        role: RoleStatus;
        token?: string;
        refreshToken?: string;
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

    if(existingEmail){
        return {
            success: false,
            code: 409,
            status: "error",
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
        code: 201,
        status: "success",
        message: "สมัครสมาชิกสำเร็จ",
        data: {
            user_id: newUser.user_id,
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
            code: 401,
            status: "error",
            message: "ไม่พบผู้ใช้งานนี้ในระบบ"
        }
    }

    const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);

    if(!isPasswordValid){
        return {
            success: false,
            code: 401,
            status: "error",
            message: "ชื่อผู้ใช้หรือรหัสผ่านผิด"
        };
    }

    //const payload = {id: (user as any).id, role: (user as any).role};
    const token = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email,
            role: user.role
        },
        AUTH_SECRET,
        { expiresIn:"15m" }
    );

    // generate refresh token
    const refreshToken = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email,
            role: user.role
        },
        AUTH_REFRESH_SECRET,
        { expiresIn: "30d" }
    );

    return{
        success: true,
        code: 200,
        status: "success",
        message: "เข้าสู่ระบบสำเร็จ",
        data: {
            user_id: user.user_id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            token,
            refreshToken
        }
    };
};

// Refresh token service: validate a refresh token and issue a new access token (and optionally a new refresh token)
export const refreshTokenService = async (refreshToken: string): Promise<AuthResult> => {
    if(!refreshToken){
        return {
            success: false,
            code: 400,
            status: "error",
            message: "Refresh token is required"
        };
    }

    try{
        const payload: any = jwt.verify(refreshToken, AUTH_REFRESH_SECRET);

        // verify user exists
        const user = await User.findOne({ where: { user_id: payload.user_id } });
        if(!user){
            return {
                success: false,
                code: 401,
                status: "error",
                message: "User not found"
            };
        }

        const newToken = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            AUTH_SECRET,
            { expiresIn: "15m" }
        );

        // rotate refresh token (optional but recommended)
        const newRefreshToken = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            AUTH_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        return {
            success: true,
            code: 200,
            status: "success",
            message: "Token refreshed",
            data: {
                user_id: user.user_id,
                email: user.email,
                fullname: user.fullname,
                role: user.role,
                token: newToken,
                refreshToken: newRefreshToken
            }
        };
    }catch(error:any){
        return {
            success: false,
            code: 401,
            status: "error",
            message: error?.message || "Invalid refresh token"
        };
    }
};
