import {Request, Response} from 'express';
import {loginService, registerService} from "../services/authen"
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"
// import User from "../models/user"

//const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const login = async (req: Request, res: Response) =>{
    try{
        const {email, user_pwd} = req.body;
        //console.log(req.body);

        if (!email || !user_pwd){
            return res
            .status(400)
            .json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน"})
        }

        //หา User
        const result = await loginService(email, user_pwd);
        return res.json(result);
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
            return res.status(400).json(
                {
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                }
            );
        }
        
        const result = await registerService(email, fullname, user_pwd, role);
        return res.json(result);

    }catch(error:any){
        console.error(error);
        return res.status(500)
        .json({message: error?.message || "Server error" });
    }
}

