//import { where } from "sequelize";
import { stat } from "fs";
import Book, { BookType, BookEndState, BookRecommended, BookStatus } from "../models/book"

export const getAllBooks = async (): Promise<Book[]> =>{
    try{
        const books = await Book.findAll();
        return books;
    }catch(error: any){
        console.error("Error fetching books", error);
        throw  new Error('Failed to fetch books from database');
    }
}

//book_id, type, img, title, intro, description, status, end_state

export const addNewBook = async (
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
) =>{
    const existingBook = await Book.findOne({
        where : {book_id}
    });
    if(existingBook) throw new Error("หนังสือเล่มนี้มีข้อมูลอยู่แล้ว")

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
        message: "Add book sucess",
        book: {
            id: newBook.id,
            title: newBook.title
        }
    }
}




// router.get("/" , async (_req, res) => {
//   try {
//     const books = await Book.findAll();
//     res.status(200).json(formatBooks(books)); // ส่งข้อมูลกลับ
//   } catch (error: any) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ message: "Failed to fetch books" });
//   }
// });

// id: number,
// book_id: string,
// type: string,
// img: string,
// title: string,
// intro: string,
// description: string,
// status: BookStatus,
// end_state: BookEndState
// createdAt?: Date,
// updatedAt?: Date