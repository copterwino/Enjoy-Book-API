import BookTran, { BookType, BookEndState, BookStatus, BookNotiAdd } from "../models/book_tran.model"

//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface BookResult{
    success: boolean;
    code: number;
    status: string;
    message: string;
    data?: BookTran[] | { id?: number; name?: string; }
}

//เรียกดูข้อมูลหนังสือทั้งหมด
export const getAllBooksService = async (): Promise<BookResult> =>{
    const books = await BookTran.findAll();
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
export const addNewBookService = async (bookData: {
    bookID: string,//FK
    type: BookType,
    img: string,
    name: string,
    title: string,
    tag: string,
    cat1: number,
    cat2: number,
    rate: number,
    des: string,
    user_id: number,
    update_at?: Date | null,
    status: BookStatus,
    view?: number,
    date_at?: Date | null,
    heart?: number,
    flower?: number,
    end: BookEndState,
    bgimg?: string | null,
    noti_add: BookNotiAdd,
    accept_conditions?: string | null,
    user_freecoin: number,
    fast_status: number
}
): Promise<BookResult> =>{

    try{
        const {bookID} = bookData
        console.log(bookID)
        const existingBook = await BookTran.findOne({
            where : { bookID: bookID }
        });
        //console.log(existingBook);
        if(existingBook){
            return{
                success: false,
                code: 409,
                status: "error",
                message: "หนังสือเล่มนี้มีข้อมูลอยู่แล้ว"
            }
        }
            const newBook = await BookTran.create(bookData);
        //console.log(newBook)
        return {
            success: true,
            code: 200,
            status: "success",
            message: "เพิ่มหนังสือสำเร็จ",
            data: {
                id: newBook.book_id,
                name: newBook.name
            }
        }
    }
    catch{
        throw new Error('Failed to fetch book from database')
    }
}

//หาข้อมูลหนังสือจากไอดี
export const getBookByIdService = async(bookID: string): Promise<BookResult> => {
    try{
        const book = await BookTran.findOne( {where: {bookID: bookID}} )

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
