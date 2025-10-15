import { Request, Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/userModel"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const login = async (req: Request, res: Response) =>{
    try{
        
    }catch(error:any){
        console.error(error);
        return res.status(500)
        .json({message: error?.message||"Server error"});
    }
};

export const register = async (req: Request, res: Response) =>{
    try{

    }catch(error:any){
        console.error(error);
        return res.status(500)
        .json({message: error?.message || "Server error" });
    }
}
