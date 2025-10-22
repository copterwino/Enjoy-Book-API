import { Request, Response} from 'express';
import { getBookGroupService } from '../services/book_group.service';

export const getBookGroup = async(req: Request, res: Response) => {
    //console.log(req.params);
    try{
        const {book_id} = req.params;
        console.log("book_id = ",book_id);
        const result = await getBookGroupService(book_id);

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
