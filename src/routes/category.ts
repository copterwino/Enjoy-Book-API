import { Router } from "express";
import { getCategory, getAllCategories } from "../controllers/category";

const router = Router();

router.get('/getCategory', getCategory);
router.get('/getAllCategories', getAllCategories);

export default router;