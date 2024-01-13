"use client";
import { createEventSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FileState, MultiImageDropzone } from "./MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

const EventForm = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const [category, setCategory] = useState([
    {
      id: 1,
      title: "One",
    },
    {
      id: 2,
      title: "Two",
    },
  ]);
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      imageUrl: [],
      price: "",
      isFree: false,
      startDateTime: new Date(),
      endDateTime: new Date(),
      url: "",
      categoryId: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createEventSchema>) {
    let productImages: any = [];
    try {
      const promise =  Promise.all(
        fileStates.map(async (addedFileState) => {
          const res = await edgestore.publicFiles.upload({
            // @ts-ignore
            file: addedFileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(addedFileState.key, progress);
              console.log(progress);
              if (progress === 100) {
                // Wait 1 second before setting to COMPLETE
                // to display 100% progress bar
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(addedFileState.key, "COMPLETE");
              }
            },
          });
          
      
          console.log(res);
          productImages.push(res.url);
        })
      );

      toast.promise(promise, {
        loading: 'Creating ...',
        success:"Created .",
        error: 'Failed To Created .',
        position:"top-center",
        duration:2000

      });
      values.imageUrl = productImages;
      console.log(values); // Now logs the updated values
    } catch (err) {
      console.error("Error during file uploads:", err);
    }

  }



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl mx-auto mt-6"
      >
        {/* Title Input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Event Title" {...field} />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        {/* Category Select */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {category.map((c) => (
                    <SelectItem key={c.id} value={`${c.id}`}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* Description Textarea */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                {/* File */}
                <MultiImageDropzone
                  className="h-[50px] w-[50px]  sm:h-[80px] sm:w-[80px] md:h-[150px] md:w-[150px] "
                  {...field}
                  value={fileStates}
                  dropzoneOptions={{
                    maxFiles: 6,
                  }}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        {/* Start Data */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        {/* Location Input */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="relative">
              <Image
                className="absolute top-1/2 -translate-y-1/2 ml-2"
                alt="location icon"
                width={25}
                height={25}
                src={"/assets/icons/location-grey.svg"}
              />
              <FormControl>
                <Input placeholder="Location" {...field} className="pl-10" />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* Price Input */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="relative">
              <Image
                className="absolute top-1/2 -translate-y-1/2 ml-2"
                alt="location icon"
                width={25}
                height={25}
                src={"/assets/icons/dollar.svg"}
              />
              <FormControl>
                <Input placeholder="price" {...field} className="pl-10 pr-20" />
              </FormControl>
              <span className="block bg-red-400 p-2 px-10 h-full absolute top-1/2 -translate-y-1/2 right-0  !m-0">
                Is Free ?
              </span>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* Url Input */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative">
              <Image
                className="absolute top-1/2 -translate-y-1/2 ml-2"
                alt="location icon"
                width={25}
                height={25}
                src={"/assets/icons/link.svg"}
              />
              <FormControl>
                <Input placeholder="Location" {...field} className="pl-10" />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <Button className=" w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
