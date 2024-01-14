"use server"

import { CreateCategoryParams } from "@/types"
import DBConnection from "../database/connection"
import categoryModel from "../database/models/Category.Model"

export const createNewCategory = async ({categoryName}:CreateCategoryParams)=>{
    await DBConnection()

    const isCategoryExist = await categoryModel.findOne({title:categoryName})
    if(isCategoryExist) return {success:false,message:"This Title Is Exist"}

    const newCategory = await categoryModel.create({title:categoryName})

    return {success:true,message:"Done",results:JSON.parse(JSON.stringify(newCategory))}
}


export const getAllCategories = async ({categoryName}:CreateCategoryParams)=>{

    await DBConnection()

    const categories = await categoryModel.find({})
    
    return {success:true,message:"Done",results:JSON.parse(JSON.stringify(categories))}
}