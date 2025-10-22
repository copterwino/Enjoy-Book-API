import {Request, Response} from 'express';
import {loginService, registerService} from "../services/authen.service"
import { refreshTokenService } from '../services/authen.service';


//import { stat } from 'fs';

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
            return res.status(result.code).json({
                code: result.code,
                status: result.status,
                message: result.message
            });
        }

        return res.status(result.code).json({
            code: result.code,
            status: result.success,
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
            return res.status(result.code).json({
                code: result.code,
                status: result.status,
                message: result.message
            })
        }

        return res.status(result.code).json(
            {
                code: result.code,
                status: result.status,
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

export const refresh = async (req: Request, res: Response): Promise<Response> =>{
    try{
        const { refreshToken } = req.body;
        const result = await refreshTokenService(refreshToken);
        if(!result.success){
            return res.status(result.code).json({ 
                code: result.code,
                status: result.status,
                message: result.message 
            });
        }

        return res.status(result.code).json({
            code: result.code,
            status: result.status,
            message: result.message,
            data: result.data
        });
    }catch(error:any){
        console.error('Error in refresh controller', error);
        return res.status(500).json({
            code: 500,
            status: 'error',
            message: error?.message || 'Server error'
        });
    }
};

