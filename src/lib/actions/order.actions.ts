"use server";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import DBConnection from "../database/connection";
import orderModel from "../database/models/Order.Model";
import userModel from "../database/models/User.Model";
import eventModel from "../database/models/Event.Model";
import { ObjectId } from "mongodb";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createNewOrder = async (order: CreateOrderParams) => {
  try {
    await DBConnection();
    const newOrder = await orderModel.create(order);
    return {
      success: true,
      message: "Order Has Created",
      results: JSON.parse(JSON.stringify(newOrder)),
    };
  } catch (error) {
    handleError(error);
  }
};

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await DBConnection();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyerId: userId };

    const orders = await orderModel
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "eventId",
        model: eventModel,
        populate: {
          path: "organizer",
          model: userModel,
          select: "firstName lastName",
        },
      });

    const ordersCount = await orderModel
      .distinct("event._id")
      .countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await DBConnection();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const orders = await orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyerId",
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$eventId",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concatArrays: ["$buyer.firstName", [" "], "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    console.log(orders);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}
