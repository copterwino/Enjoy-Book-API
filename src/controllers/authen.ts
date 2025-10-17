import {Request, Response} from 'express';
import {loginService, registerService} from "../services/authen"
import { stat } from 'fs';

// LOGIN CONTROLLER
export const login = async (req: Request, res: Response): Promise<Response> =>{
    try{
        
        const {email, user_pwd} = req.body;

        if (!email || !user_pwd){
            return res.status(400).json({ 
                code: 400,
                status: "error",
                message: "กรุณากรอกข้อมูลให้ครบถ้วน"
            });
        }

        //หา User
        const result = await loginService(email, user_pwd);

        if(!result.success){
            return res.status(401).json({
                code: 401,
                status: "error",
                message: result.message
            });
        }

        return res.status(200).json({
            code: 200,
            status: "success",
            message: result.message,
            data: result.data
        });

    }catch(error:any){
        console.error("Error in login controller", error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: error?.message || "Server error"
        });
    }
};

//REGISTER CONTROLLER
export const register = async (req: Request, res: Response): Promise<Response> =>{
    try{
        const { email, fullname, user_pwd, role} = req.body;

        if(!email || !fullname || !user_pwd){
            return res.status(400).json({
                    code: 400,
                    status: "error",
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                });
        }
        
        const result = await registerService(email, fullname, user_pwd, role);
        
        if(!result.success){
            return res.status(409).json({
                code: 409,
                status: "error",
                message: result.message
            })
        }

        return res.status(201).json(
            {
                code: 201,
                status: "sucess",
                message: result.message,
                data: result.data
            });
    }catch(error: any){
        console.error("Error in register controller", error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: error?.message || "Server error" 
        });
    }
}

