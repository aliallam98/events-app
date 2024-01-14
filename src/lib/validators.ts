import * as z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title Should be 3 chars at least"),
  category: z.string({
    required_error: "Please select an Category.",
  }).min(1,"Please select an Category"),
  description: z.string().min(3, "description Should be 3 chars at least"),
  location: z.string().min(3, "location Should be 3 chars at least"),
  imageUrl: z.array(z.string().url()),
  price: z.string(),
  isFree: z.boolean(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  url: z.string().url(),
  categoryId: z.string(),
});


export const createCategorySchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
})