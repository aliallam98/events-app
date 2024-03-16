import { Event } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import DeleteBtn from "./DeleteBtn";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/Event.Model";
import { formatDateTime } from "@/lib/utils";

interface IProps {
  event: IEvent;
  hidePrice: boolean;
  hasOrderLink: boolean;
}

const Card = ({ event, hidePrice, hasOrderLink }: IProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event?.organizer?._id?.toString();
  // const isEventCreator = userId === event.organizer.toString()

  if (!event) {
    return null;
  }

  return (
    <article
      className="relative mx-auto flex min-h-[380px]  max-w-[300px] flex-col overflow-hidden
     rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
    >
      {/* Btns */}
      {isEventCreator && (
        <div className="absolute w-fit flex gap-x-2 top-4 right-4">
          <Link
            href={`/events/${event?._id}/update`}
            className="p-1 bg-neutral-300/50 rounded-lg"
          >
            <Edit size={18} />
          </Link>
          <DeleteBtn id={event?._id} />
        </div>
      )}
      <Link href={`/events/${event?._id}`}>
        <Image
          src={`${event.imageUrl?.[0]}`}
          width={300}
          height={300}
          alt="Event Card Image"
          className="object-contain h-[300px] "
        />
      </Link>

      <div className="p-2">
        {!hidePrice && (
          <div className="flex gap-x-4 mt-2">
            <p className="bg-emerald-100 rounded-md p-1">
              {event?.isFree ? "Free" : `$${event?.price}`}
            </p>
            <p className="bg-neutral-600/10 rounded-md p-1">
              {event?.categoryId.title}
            </p>
          </div>
        )}

        <p className="my-1">{formatDateTime(event?.startDateTime).dateTime}</p>

        <h2 className="font-semibold truncate">{event?.title}</h2>

        <div className="w-full flex justify-between items-center">
          <p>
            By :{" "}
            {`${event?.organizer.firstName} | ${event?.organizer.lastName}`}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event?._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
