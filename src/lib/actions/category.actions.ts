"use server"

import { CreateCategoryParams } from "@/types"
import DBConnection from "../database/connection"
import categoryModel from "../database/models/Category.Model"



export interface CreateCategoryResult {
    success: boolean;
    message: string;
    results?: any
  }
export const createNewCategory = async ({categoryName}:CreateCategoryParams)=>{
    // const sessionClamis = 
    
    await DBConnection()

    const isCategoryExist = await categoryModel.findOne({title:categoryName})
    if(isCategoryExist) return {success:false,message:"This Title Is Exist"}

    const newCategory : CreateCategoryResult = await categoryModel.create({title:categoryName})

    return {success:true,message:"Done",results:newCategory}
}


export const getAllCategories = async ()=>{

    await DBConnection()

    const categories = await categoryModel.find({})
    
    return {success:true,message:"Done",results: categories}
}