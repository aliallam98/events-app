import { createCategorySchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { use, useEffect, useState } from "react";
import {
  createNewCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { toast } from "sonner";
import { ICategory } from "@/lib/database/models/Category.Model";

const CategorySelect = ({ value, onChangeHandler }: any) => {
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await getAllCategories()
      setCategory(allCategories.results)
    };
    getCategories();
  }, []);

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createCategorySchema>) {
    const promise = new Promise(async (resolve, reject) => {
      const category = await createNewCategory({
        categoryName: values.title,
      })

      if (category.success) {
        resolve(category.message);
        setCategory((prev)=>[...prev,category.results as ICategory])
        form.reset();
      } else {
        reject(category.message);
      }
    });

    toast.promise(promise, {
      loading: "Crating...",
      success: (message) => `${message}`,
      error: (message) => message,
      position: "top-center",
      duration: 2000,
    });
  }
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {category.map((c: ICategory) => (
          <SelectItem key={c._id} value={`${c._id}`}>
            {c.title}
          </SelectItem>
        ))}
        <AlertDialog>
          <AlertDialogTrigger>Add New Category</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center mb-2">
                Add New Category
              </AlertDialogTitle>
              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter A Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
