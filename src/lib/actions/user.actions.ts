"use server";

import DBConnection from "../database/connection";
import userModel from "../database/models/User.Model";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";
import orderModel from "../database/models/Order.Model";
import eventModel from "../database/models/Event.Model";
import { revalidatePath } from "next/cache";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await DBConnection();
    const isUserNameExist = await userModel.findOne({userName:userData.userName})
    if(isUserNameExist)
    return {
      success: false,
      message: "This Username Already Exist",
    };

    const newUser = await userModel.create(userData);
    return {
      success: true,
      message: "User Created",
      results: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    handleError(error);
  }
};
export const updateUser = async (
  clerkId: string,
  userData: CreateUserParams
) => {
  try {
    await DBConnection();
    const updatedUser = userModel.findByIdAndUpdate({ clerkId }, userData, {
      new: true,
    });
    if (!updateUser)
      return { success: false, message: "Failed To Find This user" };
    return {
      success: true,
      message: "User Created",
      results: updatedUser,
    };
  } catch (error) {
    handleError(error);
  }
};


export const deleteUser = async (clerkId: string) => {
  try {
    await DBConnection();
    const userToDelete :any = userModel.findOne({ clerkId });
    if (!userToDelete) {
        return { success: false, message: "Failed To Find This user" };
    }

    const id = userToDelete._id

 // Unlink relationships
//  await Promise.all([

//     // Update the 'events' collection to remove references to the user
//     // eventModel.updateMany(
//     //   { _id: { $in: userToDelete.events } },
//     //   { $pull: { organizer: userToDelete._id } }
//     // ),

//     // Update the 'orders' collection to remove references to the user
//     // orderModel.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
//   ])

  // Delete user
  const deletedUser = await userModel.findByIdAndDelete(id)
  revalidatePath('/') 

  return deletedUser ? deletedUser : null
} catch (error) {
  handleError(error)
}
}

