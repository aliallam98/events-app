"use server";

import DBConnection from "../database/connection";
import eventModel from "../database/models/Event.Model";
import { handleError } from "../utils";

interface IEventParams {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  categoryId: string;
  price: string;
  isFree: boolean;
  url: string;
}

export const createNewEvent = async (eventData: IEventParams) => {
  console.log(eventData);
};

export const getEventById = async (id: String) => {
  const event = await eventModel.findById(id);

  if (!event) return { success: true, message: "Cannot Find This Event" };

  return {
    success: true,
    message: "Cannot Find This Event",
    results: event,
  };
};
export const getRelatedEvents = async (id: String, categoryId: string) => {
  const events = await eventModel.find({
    $and: [{ _id: { $ne: id } }, { categoryId }],
  });
  return { success: true, message: "Cannot Find This Event", results: events };
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
      results: event,
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventById = async (id: String) => {
  const eventToDelete = await eventModel.findByIdAndDelete(id);

  if (!eventToDelete)
    return { success: false, message: "Cannot Find This Event" };

  return {
    success: true,
    message: "Deleted",
  };
};


//get events by userId