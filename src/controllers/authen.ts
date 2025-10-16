import { Request, Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const login = async (req: Request, res: Response) =>{
    try{
        const {email, user_pwd} = req.body;
        console.log(req.body);

        if (!email || !user_pwd){
            return res
            .status(400)
            .json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน"})
        }

        //หา User
        const user = await User.findOne({ where:{ email}});
        if(!user){
            return res
            .status(401)
            .json({ message: "ชื่อผู้ใช้ไม่ถูกหรือรหัสผ่านผิด!!!"})
        }

        //เช็ค user_pwd
        const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);
        if (!isPasswordValid){
            return res
            .status(401)
            .json({message: "ชื่อผู้ใช้ไม่ถูกหรือรหัสผ่านผิด"})
        }

        //สร้าง JWT ให้ paylode มี id, role 
        const payload = {id: (user as any).id, role: (user as any).role};
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});

        return res.json({
            message: "login success",
            token,
            user:{
                id: user.id,
                fullname: user.fullname,
                role: user.role,
                
            }
        });
    }catch(error:any){
        console.error(error);
        return res.status(500)
        .json({message: error?.message||"Server error"});
    }
};

export const register = async (req: Request, res: Response) =>{
    try{
        const { email, fullname, user_pwd, role} = req.body;
        if(!email || !fullname || !user_pwd){
            return res.status(400).json({
                message : "กรุณากรอกข้อมูลให้ครบถ้วน"
            })
        }

        const existingEmail = await User.findOne({where : {email}});
        if(existingEmail){
            return res.status(409).json({
                message : "อีเมลนี้ถูกใช้ไปแล้ว"
            })
        }

        //hash
        const hashedPassword = await bcrypt.hash(user_pwd as string, 10);
        
        // บันทึก user ใหม่
        const newUser = await User.create({
        email: email,
        user_pwd: hashedPassword,
        fullname : fullname,
        role: role || "user",
        });


        return res.json({
            message: "Register success",
            user : {
                id : newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        });
        

    }catch(error:any){
        console.error(error);
        return res.status(500)
        .json({message: error?.message || "Server error" });
    }
}

