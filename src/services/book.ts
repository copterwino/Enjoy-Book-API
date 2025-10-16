import { where } from "sequelize";
import Book from "../models/book";

export const getAllBooks = async (): Promise<Book[]> =>{
    try{
        const books = await Book.findAll();
        return books;
    }catch(error: any){
        console.error("Error fetching books", error);
        throw  new Error('Failed to fetch books from database');
    }
}



// export const addBook = async (): Promise<Book[]> =>{
//     const {book_id, type, img, title, intro, description} = requestAnimationFrame.boody

//     const newBook = await Book.create({
//         id: number,
//         book_id: string,
//         type: string,
//         img: string,
//         title: string,
//         intro: string,
//         description: string,
//         createdAt?: Date,
//         updatedAt?: Date
//     })
// }

// router.get("/" , async (_req, res) => {
//   try {
//     const books = await Book.findAll();
//     res.status(200).json(formatBooks(books)); // ส่งข้อมูลกลับ
//   } catch (error: any) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ message: "Failed to fetch books" });
//   }
// });

