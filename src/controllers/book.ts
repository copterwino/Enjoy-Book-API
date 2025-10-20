import { Request, Response} from 'express';
import { getAllBooksService, addNewBookService, getBookByIdService } from '../services/book';


export  const getBooks = async (req: Request, res: Response) => {
    try{
        const result = await getAllBooksService();
        console.log(result);

        if(!result.success){
            return res.status(result.code).json({
                code: result.code,
                status: result.status,
                message: result.message
            })
        }

        return res.status(result.code).json({
            code: result.code,
            status: result.status,
            message: result.message,
            data: result.data
        });
    }catch(error){
        console.error('Error in get Books controller', error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "ไม่สามารถดึงข้อมูลได้"
        })
    }
};

export const addBook = async (req: Request, res: Response) => {
    try{
        const {book_id, type, img, title, by, intro, description, status, end_state} = req.body;
        //ดักError กรุณากรอกข้อมูลให้ครบ
        if(!book_id || !type || !img || !title || !intro || !description){
            return res.status(400).json(
                {
                    code: 400,
                    status: "error",
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                }
            );  
        }

        const result = await addNewBookService(book_id, type, img, by, title, intro, description, status, end_state);

        if(!result.success){
            return res.status(result.code).json({
                code: result.code,
                status: result.status,
                message: result.message,
            })
        }

        return res.status(200).json({
            code: result.code,
            status: result.status,
            message: result.message,
            data: result.data
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

export const getBookById = async(req: Request, res: Response) => {
    //console.log(req.params);
    try{
        const {book_id} = req.params;
        console.log("book_id = ",book_id);
        const result = await getBookByIdService(book_id);

        if(!result.success){
            return res.status(result.code).json({
                code: result.code,
                status: result.status,
                message: result.message
            });
        }

        return res.status(200).json({
            code: 200,
            status: result.status,
            message: result.message,
            data: result.data
        });
    }catch(error){
        console.error('Error in post Book controller', error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "ไม่สามารถค้นหาหนังสือได้"
        })
    }
}
