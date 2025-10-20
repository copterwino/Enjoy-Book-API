import { Response } from "express";

/**
 * ส่ง response แบบมาตรฐานกลับไปยัง client
 * @param res - express response object
 * @param code - HTTP status code (เช่น 200, 400, 500)
 * @param status - "success" หรือ "error"
 * @param message - ข้อความตอบกลับ
 * @param data - ข้อมูลเพิ่มเติม (optional)
 */

export const sendResponse = <T = any>(
    res: Response,
    code: number,
    status: "success" | "error",
    message: string,
    data?: T
) => {
    
    if (status === "error") {
        console.error(`[${code}] ${message}`);
    }

    return res.status(code).json({
        code,
        status,
        message,
        ...(data != undefined && {data}) //ป้องกัน edge case
    });
}

