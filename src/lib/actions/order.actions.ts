"use server";
import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import DBConnection from "../database/connection";
import orderModel from "../database/models/Order.Model";

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


export const createNewOrder = async (order:CreateOrderParams)=>{
  try {
    await DBConnection()
    const newOrder = await orderModel.create(order)
    return {success:true,message:"Order Has Created" , results : JSON.parse(JSON.stringify(newOrder))}
  } catch (error) {
    handleError(error)
  }
}