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
}

const Card = ({ event }: IProps) => {
  const { sessionClaims } = auth();
  // const userId = sessionClaims.userId
  // const isEventCreator = userId === event._id.toString()
  const isEventCreator = true;

  console.log(event.price);
  

  return (
    <article className="relative shadow-sm hover:shadow-lg transition max-w-[300px]">
      {/* Btns */}
      {isEventCreator && (
        <div className="absolute w-fit flex gap-x-2 top-4 right-4">
          <Link href={`/events/${event._id}/update`} className="p-1 bg-neutral-300/50 rounded-lg">
            <Edit size={18} />
          </Link>
          <DeleteBtn id={event._id} />
        </div>
      )}
      <Link href={`/events/${event._id}`}>
        <Image
          src={`${event.imageUrl?.[0]}`}
          width={300}
          height={300}
          alt="Event Card Image"
        />
      </Link>

      <Link href={`/events/${event._id}`}>
        <div className="p-2">
          <div className="flex gap-x-4 mt-2">
            <p className="bg-emerald-100 rounded-md p-1">
              {event.isFree ? "Free"  : `$${event.price}`}
            </p>
            <p className="bg-neutral-600/10 rounded-md p-1">
              {event.categoryId.title}
            </p>
          </div>

          <p className="my-1">{formatDateTime(event.startDateTime).dateTime}</p>

          <h2 className="font-semibold truncate">{event.title}</h2>

          <p className="mt-4">
            By : {`${event.organizer.firstName} | ${event.organizer.lastName}`}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default Card;
