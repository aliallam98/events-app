import * as z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title Should be 3 chars at least"),
  description: z.string().min(3, "Title Should be 3 chars at least"),
  location: z.string().min(3, "Title Should be 3 chars at least"),
  imageUrl: z.string().url(),
  price: z.string(),
  isFree: z.boolean(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  url: z.string().url(),
  categoryId: z.string(),
});
