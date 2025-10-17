import { Router, Request, Response } from "express";

import { getBooks, addBook} from "../controllers/book";

import { getBookByIdService } from "../services/book";

const router = Router();

router.get('/getBooks', getBooks);

router.post('/addBook', addBook);

//router.get('/:book_id', getBookById);
import Book from "../models/book"

router.get('/:book_id',  async (req: Request, res: Response) => {
    console.log(req.params);
    try{
        const {book_id} = req.params;
        //console.log(req.params);
        const book = await Book.findOne( {where: {book_id.str}} )
        if(!book){
            return res.status(500).json({
                code: 500,
                status: "error",
                message: "ค้นหาหนังสือไม่เจอ",
            });
        }
        
        return res.status(200).json({
            code: 200,
            status: "ok",
            message: "ค้นหาหนังสือสำเร็จ"
        })

    }catch(error){
        console.error('Error in post Book controller', error);
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "ค้นหาหนังสือไม่สำเร็จ"
        })
    }
});

export default router;