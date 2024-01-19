"use server"

import { CreateCategoryParams } from "@/types"
import DBConnection from "../database/connection"
import categoryModel, { ICategory } from "../database/models/Category.Model"



export interface CreateCategoryResult {
    success: boolean;
    message: string;
    results?: ICategory
  }
export const createNewCategory = async ({categoryName}:CreateCategoryParams)=>{

    await DBConnection()

    const isCategoryExist = await categoryModel.findOne({title:categoryName})
    if(isCategoryExist) return {success:false,message:"This Title Is Exist"}

    const newCategory : ICategory = await categoryModel.create({title:categoryName})

    return {success:true,message:"Done",results:JSON.parse(JSON.stringify(newCategory))}
}


export const getAllCategories = async ()=>{

    await DBConnection()

    const categories = await categoryModel.find({})
    

    // JSON.parse(JSON.stringify(categories)) To Avoid 
    // Warning: Only plain objects can be passed to Client Components from Server Components
    return {success:true,message:"Done",results: JSON.parse(JSON.stringify(categories))}  
}

export const getCategoryByName = async (title: string) => {
    return categoryModel.findOne({ title: { $regex: title, $options: 'i' } })
  }