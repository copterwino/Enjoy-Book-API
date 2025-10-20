import { Request, Response} from 'express';
import { getCategoryService, getAllCategoriesService } from '../services/category';
import { getSubCategoryService, getAllSubCategoriesService } from '../services/category';

//CATEGORIES
export  const getCategory = async (req: Request, res: Response) => {
    try{
        const {id} = req.body;
        const category = await getCategoryService(id);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "ดึงข้อมูลสำเร็จ",
            data: category
        });
    }catch(error){
        console.error('Error in get category controller', error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: 'ดึงข้อมูลไม่สำเร็จ'
        })
    }
};
export const getAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await getAllCategoriesService();
        res.status(200).json({
            code:200,
            status: "sucess",
            message: "ดึงข้อมูลสำเร็จ",
            data: categories
        })
    }catch(error){
        console.error('Error in get categories controller', error);
        res.status(500).json({
            code: 500,
            status: "failed",
            message: "ดึงข้อมูลไม่สำเร็จ",
        });
    }
}

//SUB CATEGORIES
export  const getSubCategory = async (req: Request, res: Response) => {
    try{
        const {id} = req.body;
        const category = await getSubCategoryService(id);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "ดึงข้อมูลสำเร็จ",
            data: category
        });
    }catch(error){
        console.error('Error in get category controller', error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: 'ดึงข้อมูลไม่สำเร็จ'
        })
    }
};
export const getAllSubCategories = async (req: Request, res: Response) => {
    try{
        const categories = await getAllSubCategoriesService();
        res.status(200).json({
            code:200,
            status: "sucess",
            message: "ดึงข้อมูลสำเร็จ",
            data: categories
        })
    }catch(error){
        console.error('Error in get categories controller', error);
        res.status(500).json({
            code: 500,
            status: "failed",
            message: "ดึงข้อมูลไม่สำเร็จ",
        });
    }
}
