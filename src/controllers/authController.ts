import { Request, Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/userModel"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";


import { getAllUsers } from '../services/userService';

export const getUsers = (req : Request , res : Response) => {
    const users = getAllUsers();
    res.json(users);
}



