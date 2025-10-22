import { Router, Request, Response } from "express";

//import { getBookGroup} from "../controllers/book_group.controller";
import { verifyToken } from "../middlewares/authen.middleware";

const router = Router();

//router.get('/getBookGroup', getBookGroup);

export default router;