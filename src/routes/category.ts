import { Router } from "express";
import { getCategory, getAllCategories } from "../controllers/category";
import { getSubCategory, getAllSubCategories } from "../controllers/category";

const router = Router();

router.get('/getCategory', getCategory);
router.get('/getAllCategories', getAllCategories);

router.get('getSubCategory', getSubCategory);
router.get('getAllSubCategories', getAllSubCategories);

export default router;