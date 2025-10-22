import Category  from "../models/category.model"
import SubCategory from "../models/sub_category.model";

//ประกาศ Type สำหรับผลลัพธ์ของ Service
interface CategoryResult{
    success: boolean;
    code: number;
    status: string;
    message: string;
    data?: Category | Category[] | SubCategory | SubCategory[] | null
}

//CATEGORIES
export const getAllCategoriesService = async (): Promise<CategoryResult> =>{
    try{
        const categories = await Category.findAll();
        return {
            success: true,
            code: 200,
            status: "success",
            message: "ค้นหาหมวดหมู่ทั้งหมดสำเร็จ"
        }
    }catch(error: any){
        console.error("Error fetching categories.", error);
        throw  new Error('Failed to fetch categories from database');
    }
}
export const getCategoryService = async (id: number) : Promise<CategoryResult>=>{
    try{
        const category = await Category.findOne({
            where : {id}
        });
        if(!category){
            return{
                success: false,
                code: 401,
                status: "error",
                message: "ไม่พบหมวดหมู่ที่ต้องการ"
            }
        }
        return {
                success: true,
                code: 200,
                status: "success",
                message: "ค้นพบหมวดหมู่ที่ต้องการ"
        };

    }catch(error: any){
        console.error("Error fetching category.", error)
        throw new Error('Failed to fetch category from database')
    }
}

//SUB CATEGORIES
export const getAllSubCategoriesService = async (): Promise<CategoryResult> =>{
    try{
        const categories = await SubCategory.findAll();
        return {
            success: true,
            code: 200,
            status: "success",
            message: "ค้นพบหมวดหมู่ย่อยทั้งหมด"
        };
    }catch(error: any){
        console.error("Error fetching categories.", error);
        throw  new Error('Failed to fetch categories from database');
    }
}
export const getSubCategoryService = async (id: number) : Promise<CategoryResult>=>{
    try{
        const category = await SubCategory.findOne({
            where : {id}
        });
        if(!category){
            
        }
        return {
            success: true,
            code: 200,
            status: "success",
            message: "ค้นพบหมวดหมู่ย่อยที่ต้องการ"
        };
    }catch(error: any){
        console.error("Error fetching category.", error)
        throw new Error('Failed to fetch category from database')
    }
}
