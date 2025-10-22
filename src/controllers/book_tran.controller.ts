import { Request, Response} from 'express';
import { getAllBooksService, addNewBookService, getBookByIdService } from '../services/book_tran.service';


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
        const bookData = req.body;

        const requiredFields = [
            'bookID', 'type','img','name', 'title', 'tag',
            'cat1','cat2','rate','des','user_id','status',
            'end','noti_add','user_freecoin','fast_status'
        ];
        //console.log(bookData)
        //ดักError กรุณากรอกข้อมูลให้ครบ
        // ตรวจหาช่องที่ขาด
        const missingFields = requiredFields.filter(field => !bookData[field]);
        //console.log('Missing fields:', missingFields);
        if(missingFields.length > 0){
            return res.status(400).json(
                {
                    code: 400,
                    status: "error",
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน"
                }
            );  
        }

        const result = await addNewBookService(bookData);

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


// !bookID ||
// !type ||
// !img ||
// !name ||
// !title ||
// !tag ||
// !cat1 ||
// !cat2 ||
// !rate ||
// !des ||
// !user_id ||
// !status ||
// !bgimg ||
// !end ||
// !use_freecoi ||
// !fast_status  ||

// bookID, 
// type,
// img,
// name, 
// title, 
// tag,
// cat1,
// cat2,
// rate,
// des,
// user_id,
// status,
// bgimg,
// end,
// use_freecoin,
// fast_status