import CheckoutButtons from "@/components/checkout/CheckoutButtons";
import Card from "@/components/events/Card";
import EventsCollection from "@/components/events/EventsCollection";
import { Button } from "@/components/ui/button";
import { getEventById, getRelatedEvents } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//Prepared event page and created getEventById server function

interface IParams {
  params: {
    id: string;
  };
}

const EventPage = async ({ params: { id } }: IParams) => {

  const event = await getEventById(id);
  const categoryId = event.results.categoryId;
  const relatedEvents = await getRelatedEvents(id, categoryId);

  const isFree = event.results.isFree;
  

  return (
    <>
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-2">
          <Image
            width={600}
            height={600}
            alt="Event Image"
            src={event.results.imageUrl[0]}
            className="max-w-full max-h-full rounded-3xl border"
          />
          <div className="container space-y-4">
            <h2 className="font-bold text-2xl mt-4">{event.results.title}</h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex gap-4">
                <p className="bg-emerald-100 rounded-2xl p-2">
                  {isFree ? "Free"  : `$${event.results.price}`}
                </p>
                <p className="bg-neutral-600/10 rounded-2xl p-2">
                  {event.results.categoryId.title}
                </p>
              </div>
              <p className="font-semibold">
                By :{" "}
                {`${event.results.organizer.firstName} ${event.results.organizer.lastName}`}
              </p>
            </div>

            {/* Buy A Ticket */}
            <CheckoutButtons
            event={event.results}
            />

            <div className="flex gap-2">
              <Image
                alt="location icon"
                width={25}
                height={25}
                src={"/assets/icons/calendar.svg"}
              />
              <p>
                {formatDateTime(event.results.startDateTime).dateTime} /{" "}
                {formatDateTime(event.results.endDateTime).dateTime}
              </p>
            </div>

            <div className="flex gap-2">
              <Image
                alt="location icon"
                width={25}
                height={25}
                src={"/assets/icons/location.svg"}
              />
              <p>{event.results.location}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>{"Details Of Event :"}</p>
              <p>{event.results.description}</p>
              <p className="underline text-blue-300">
                <Link href={event.results.url}>{event.results.url}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Related events  with the same category */}
        <div className="container my-6">
          <h2 className="font-bold text-2xl">Related events </h2>
          <EventsCollection
            data={relatedEvents.results}
            emptyTitle="No Events Found"
            subEmptyTitle="Come back later"
            page={1}
            limit={6}
            totalPages={2}
            type="All_Events"
          />
        </div>
      </section>
    </>
  );
};

export default EventPage;
