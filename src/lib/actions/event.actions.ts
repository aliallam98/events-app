"use server";

import DBConnection from "../database/connection";
import eventModel, { IEvent } from "../database/models/Event.Model";
import userModel from "../database/models/User.Model";
import { handleError } from "../utils";

interface IEventParams {
  title: string;
  description: string;
  location: string;
  imageUrl: string[];
  startDateTime: Date;
  endDateTime: Date;
  categoryId: string;
  price: string;
  isFree: boolean;
  url: string;
}

export const createNewEvent = async (
  eventData: IEventParams,
  userId: string
) => {
  try {
    await DBConnection();
    const isUserExist = await userModel.findOne({ _id: userId });

    if (!isUserExist) {
      return { success: false, message: "User Not Found" };
    }

    const event = await eventModel.create({ ...eventData, organizer: userId });

    return {
      success: false,
      message: "User Not Found",
      results: JSON.parse(JSON.stringify(event)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (id: String) => {
  await DBConnection();

  const event = await eventModel.findById(id)

  if (!event) return { success: true, message: "Cannot Find This Event" };

  return {
    success: true,
    message: "Cannot Find This Event",
    results: JSON.parse(JSON.stringify(event)),
  };
};
export const getRelatedEvents = async (id: String, categoryId: string) => {
  await DBConnection();

  const events = await eventModel.find({
    $and: [{ _id: { $ne: id } }, { categoryId }],
  });
  return { success: true, message: "Cannot Find This Event", results:  JSON.parse(JSON.stringify(events)) };
};

export const updateEventById = async (
  eventId: string,
  eventData: any,
  userId: string
) => {
  try {
    await DBConnection();
    const isEventExist = await eventModel.findById(eventId);
    if (!isEventExist)
      return { success: false, message: "Cannot Find This Event" };
    if (isEventExist.organizer.toString() !== userId)
      return { success: false, message: "Unauthorized" };

    const event = await eventModel.findByIdAndUpdate(
      eventId,
      { ...eventData },
      { new: true }
    );
    return {
      success: false,
      message: "Unauthorized",
      results: JSON.parse(JSON.stringify(event)) ,
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventById = async (id: String) => {
  await DBConnection();

  const eventToDelete = await eventModel.findByIdAndDelete(id);

  if (!eventToDelete)
    return { success: false, message: "Cannot Find This Event" };

  return {
    success: true,
    message: "Deleted",
  };
};

//get events by userId

export const getEventByUserId = async (userId: string) => {
  await DBConnection();

  const isUserExist = await userModel.findById(userId);
  if (!isUserExist) return { success: false, message: "Cannot Find This User" };

  const events = await eventModel.find({ organizer: userId }).populate([
    // {
    //   path: "Category",
    //   select: "title",
    // },
    {
      path: "organizer",
      select: "firstName lastName",
    },
  ]);

  return {
    success: true,
    message: "Done",
    results: JSON.parse(JSON.stringify(events)),
  };
};
export const getAllEvents = async () => {
  await DBConnection();

  const events = await eventModel.find().populate([
    { path: "organizer", select: "firstName lastName" },
    // { path: "categoryId", select: "title" },
  ]);

  return { success: true, message: "Done", results:JSON.parse(JSON.stringify(events)) };
};
