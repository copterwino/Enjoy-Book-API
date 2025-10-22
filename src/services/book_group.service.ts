import BookGroup from "../models/book_group.model";


//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface BookGroupResult{
    success: boolean;
    code: number;
    status: string;
    message: string;
    data?: BookGroup[]
}

//เรียกดูข้อมูลหนังสือทั้งหมด
export const getBookGroupService = async ( book_id: string): Promise<BookGroupResult> =>{
    try{
        const group = await BookGroup.findAll( { where: { book_id: book_id} } );
        if(!group){
            return {
                success: false,
                code: 401,
                status: "error",
                message: "ไม่พบกลุ่มของหนังสือที่ต้องการ",
            };
        }
        return {
            success: true,
            code: 200,
            status: "success",
            message: "พบกลุ่มของหนังสือที่ต้องการ",
            data: group
        }
    }catch(error){
        throw new Error('Failed to fetch book_group from database')
    }
}