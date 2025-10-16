import { Router, Request, Response } from "express";


import Book from "../models/book"
import User from "../models/user";
//import BookEp from "../models/book_ep"

import { getBooks, addBook } from "../controllers/book";


const router = Router();

router.get('/getBooks', getBooks);

router.post('/addBook', addBook);

export default router;