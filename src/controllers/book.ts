import { Request, Response} from 'express';
import { getAllBooks, addNewBook } from '../services/book';
import Book from '../models/book';

export  const getBooks = async (req: Request, res: Response) => {
    try{
        const books = await getAllBooks();
        res.json({
            code: 200,
            status: "success",
            message: "ดึงข้อมูลสำเร็จ",
            data:
                books
        });
    }catch(error){
        console.error('Error in get Books controller', error);
        res.status(500).json({message: 'Failed to fetch books'})
    }
};

export const addBook = async (req: Request, res: Response) => {
    try{
        const {book_id, type, img, title, by, intro, description, status, end_state} = req.body;
        //ดักError เช่น กรุณากรอกข้อมูลให้ครบ
        if(!book_id || !type || !img || !title || !intro || !description){
            return res.status(400).json(
                {
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                }
            );
        }
        console.log(req.body);

        const result = await addNewBook(book_id, type, img, by, title, intro, description, status, end_state);

        return res.json(result);
    }catch(error){
        console.error('Error in post Book controller', error);
        res.status(500).json({message: 'Failed to add books'})
    }
}

//Format แบบนี้ **
// {
//     "code": 200,
//     "status": "success",
//     "message": "ดึงคอมเมนท์สำเร็จ",
//     "data": {
//         "page": 1,
//         "limit": 20,
//         "total": 1,
//         "totalPages": 1
//     }
// }