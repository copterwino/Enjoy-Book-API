//import { where } from "sequelize";
//import { stat } from "fs";
import Book, { BookType, BookEndState, BookRecommended, BookStatus } from "../models/book"

//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface BookResult{
    success: boolean;
    code: number;
    status: string;
    message: string;
    data?: Book[] | { id?: number; title?: string; }
}

//เรียกดูข้อมูลหนังสือทั้งหมด
export const getAllBooksService = async (): Promise<BookResult> =>{
    const books = await Book.findAll();
    if(!books){
        return {
            success: false,
            code: 401,
            status: "error",
            message: "ไม่พบข้อมูลหนังสือ",
        };
    }
    return {
        success: true,
        code: 200,
        status: "success",
        message: "ดึงข้อมูลหนังสือสำเร็จ",
        data: books
    }
}

//เพิ่มหนังสือใหม่
export const addNewBookService = async (
    book_id: string,
    type: BookType,
    category: number,
    sub_category: number,
    img: string,
    by: string,
    title: string,
    intro: string,
    description: string,
    tag?: string,
    recommended?: BookRecommended,
    status?: BookStatus,
    end_state?: BookEndState,
    view? : number
): Promise<BookResult> =>{

    const existingBook = await Book.findOne({
        where : {book_id}
    });

    if(existingBook){
        return{
            success: false,
            code: 409,
            status: "error",
            message: "หนังสือเล่มนี้มีข้อมูลอยู่แล้ว"
        }
    }

    const newBook = await Book.create({
        book_id: book_id,
        type: type,
        category: category,
        sub_category: sub_category,
        img: img,
        by: by,
        title: title,
        intro: intro,
        description: description,
        tag: tag,
        recommended: recommended,
        status: status || BookStatus.PRIVATE,
        end_state: end_state || BookEndState.NOT_END,
        view: view
    });

    return {
        success: true,
        code: 200,
        status: "success",
        message: "เพิ่มหนังสือสำเร็จ",
        data: {
            id: newBook.id,
            title: newBook.title
        }
    }

}

//หาข้อมูลหนังสือจากไอดี
export const getBookByIdService = async(book_id: string): Promise<BookResult> => {
    try{
        const book = await Book.findOne( {where: {book_id}} )

        if(!book){
            return{
                success: false,
                code: 401,
                status: "error",
                message: "ไม่พบหนังสือที่ต้องการ"
            }
        }
        return {
            success: true,
            code: 200,
            status: "success",
            message: "ค้นหาหนังสือสำเร็จ",
            data: book
        }
    }catch{
        throw new Error('Failed to fetch book from database')
    }
}
