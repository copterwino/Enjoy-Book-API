import { Request, Response} from 'express';
import { getAllBooks } from '../services/book';
import Book from '../models/book';

export  const getBooks = async (req: Request, res: Response) => {
    try{
        const books = await getAllBooks();
        res.json(books);
    }catch(error){
        console.error('Error in get Books controller', error);
        res.status(500).json({message: 'Failed to fetch books'})
    }
};

export const addBook = async (req: Request, res: Response) => {
    try{
        const {book_id, type, img, title, intro, description, status, end_state} = req.body;
        const newBook = await Book.create({
            book_id: book_id,
            type: type,
            img: img,
            title: title,
            intro: intro,
            description: description,
            status: status,
            end_state: end_state
        })
        return res.json(({
            message: "Add book sucess",
            book:{
                id: newBook.id,
                book_id: newBook.book_id,
                title: newBook.title,
            }
        }));
    }catch(error){
        console.error('Error in post Book controller', error);
        res.status(500).json({message: 'Failed to add books'})
    }
}
