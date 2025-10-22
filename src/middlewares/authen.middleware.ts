import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const AUTH_SECRET = process.env.AUTH_SECRET || 'fallback_secret';

// augment Request to include user property
declare global {
	namespace Express {
		interface Request {
			user?: any
		}
	}
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'] || req.headers['Authorization'];
	if(!authHeader) return res.status(401).json({ code:401, status: 'error', message: 'No token provided' });

	const token = (authHeader as string).startsWith('Bearer ') ? (authHeader as string).slice(7) : authHeader as string;
	try{
		const payload = jwt.verify(token, AUTH_SECRET) as any;
		req.user = payload;
		next();
	}catch(error:any){
		return res.status(401).json({ code:401, status:'error', message: error?.message || 'Invalid token' });
	}
};

