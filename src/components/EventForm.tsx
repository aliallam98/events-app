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
import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FileState, MultiImageDropzone } from "./MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CategorySelect from "./CategorySelect";
import { Event } from "@/types";
import { createNewEvent } from "@/lib/actions/event.actions";
import { auth, useUser } from "@clerk/nextjs";
import { IEvent } from "@/lib/database/models/Event.Model";

interface IProps {
  type: string;
  event?: Event;
}

const EventForm = ({ type ,event}: IProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

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

  const eventDefaultValues = {
    title: "",
    categoryId: "",
    description: "",
    location: "",
    imageUrl: [],
    price: "",
    isFree: false,
    startDateTime: new Date(),
    endDateTime: new Date(),
    url: "",
  };
  const initValues =
    event && type === "update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
    console.log(event && type === "update");
    console.log(initValues);

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: initValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createEventSchema>) {
    if (type === "Create") {
      let productImages: any = [];
      try {
        if (fileStates.length > 0) {
          await Promise.all(
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
          values.imageUrl = productImages;
          await createNewEvent(values, userId);
        }
      } catch (err) {
        console.error("Error during file uploads:", err);
      }
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CategorySelect
                  onChangeHandler={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4">
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

          {/* File */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl>
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
        </div>
        {/* Start Data */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date Time</FormLabel>
                {/* <CalendarIcon  size={18} className="relative left-48 top-[37px] z-50 text-muted-foreground"/> */}
                <FormControl>
                  <DatePicker
                    className="border rounded-md p-2 outline-none"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                  />
                </FormControl>
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
                {/* <CalendarIcon  size={18} className="relative left-48 top-[37px] z-50 text-muted-foreground"/> */}
                <FormControl>
                  <DatePicker
                    className="border rounded-md p-2 outline-none"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                  />
                </FormControl>
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
        <div className="relative flex items-center">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="relative grow mt-0">
                <Image
                  className="absolute top-1/2 -translate-y-1/2 ml-2"
                  alt="location icon"
                  width={25}
                  height={25}
                  src={"/assets/icons/dollar.svg"}
                />
                <FormControl>
                  <Input
                    placeholder="price"
                    {...field}
                    className="pl-10 pr-20 !m-0"
                  />
                </FormControl>

                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="absolute right-0 flex items-center space-x-3 space-y-0 h-full px-4 w-fit">
                <FormLabel>Is Free ?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Url Input */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative">
              <Image
                className="absolute top-1/2 -translate-y-1/2 ml-2"
                alt="url icon"
                width={25}
                height={25}
                src={"/assets/icons/link.svg"}
              />
              <FormControl>
                <Input placeholder="Url" {...field} className="pl-10" />
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
