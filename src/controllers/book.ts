import { Request, Response} from 'express';
import { getAllBooksService, addNewBookService, getBookByIdService } from '../services/book';

export  const getBooks = async (req: Request, res: Response) => {
    try{
        const result = await getAllBooksService();
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "ดึงข้อมูลหนังสือสำเร็จ",
            data: result.data
        });
    }catch(error){
        console.error('Error in get Books controller', error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "ดึงข้อมูลหนังสือไม่สำเร็จ"
        })
    }
};

export const addBook = async (req: Request, res: Response) => {
    try{
        const {book_id, type, img, title, by, intro, description, status, end_state} = req.body;
        //ดักError เช่น กรุณากรอกข้อมูลให้ครบ
        if(!book_id || !type || !img || !title || !intro || !description){
            res.status(400).json(
                {
                    code: 400,
                    status: "error",
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                }
            );  
        }
        const result = await addNewBookService(book_id, type, img, by, title, intro, description, status, end_state);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "เพิ่มข้อมูลหนังสือสำเร็จ",
            data: result
        });
    }catch(error){
        console.error('Error in post Book controller', error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: "เพิ่มข้อมูลหนังสือไม่สำเร็จ",
        })
    }
}

// export const getBookById = async(req: Request, res: Response) => {
//     //console.log(req.params);
//     try{
//         const {book_id} = req.params;
//         console.log(req.params);
//         const result = await getBookByIdService(book_id);

//         return res.status(200).json({
//             code: 200,
//             status: "success",
//             message: "ค้นหาหนังสือสำเร็จ",
//             data: result
//         });
//     }catch(error){
//         console.error('Error in post Book controller', error);
//         return res.status(500).json({
//             code: 500,
//             status: "error",
//             message: "ค้นหาหนังสือไม่สำเร็จ"
//         })
//     }
// }

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