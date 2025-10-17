import Category  from "../models/category"

export const getAllCategoriesService = async (): Promise<Category[]> =>{
    try{
        const categories = await Category.findAll();
        return categories;
    }catch(error: any){
        console.error("Error fetching categories.", error);
        throw  new Error('Failed to fetch categories from database');
    }
}

export const getCategoryService = async (id: number) : Promise<Category | null>=>{
    try{
        const category = await Category.findOne({
            where : {id}
        });
        if(!category){
            
        }
        return category;
    }catch(error: any){
        console.error("Error fetching category.", error)
        throw new Error('Failed to fetch category from database')
    }
}