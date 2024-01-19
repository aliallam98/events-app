"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/Category.Model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const FilterByCategory = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await getAllCategories();
      setCategory(allCategories.results);
    };
    getCategories();
  }, []);


  const onSelectHandler = (category:string)=>{
    let newUrl = '';

    
    if (category && category !== "All") {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "category",
          value: category,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: category.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl,{scroll:false});
  }
  return (
    <Select onValueChange={(value:string)=>onSelectHandler(value)}>
      <SelectTrigger className="flex items-center gap-2 w-full md:max-w-[400px] bg-purple-100 rounded-3xl px-4">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value={"All"}>All</SelectItem>
        {category.map((c: ICategory) => (
          <SelectItem key={c._id} value={`${c.title}`}>
            {c.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterByCategory;



//To Do
//Slugify 