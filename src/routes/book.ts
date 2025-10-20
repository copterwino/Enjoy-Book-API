import { Router, Request, Response } from "express";

import { getBooks, addBook, getBookById} from "../controllers/book";

//import { getBookByIdService } from "../services/book";
//import Book from "../models/book"

const router = Router();

router.get('/getBooks', getBooks);

router.post('/addBook', addBook);

router.get('/:book_id', getBookById);

export default router;