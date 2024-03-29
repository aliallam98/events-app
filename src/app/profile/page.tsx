import EventsCollection from "@/components/events/EventsCollection";
import { Button } from "@/components/ui/button";
import {
  getAllEvents,
  getEventById,
  getEventByUserId,
} from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/Order.Model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React, { Suspense } from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth(); //use only in server com .
  const userId = sessionClaims?.userId as string;
  const myEvents = await getEventByUserId(userId);
  const myTickets = await getOrdersByUser({ userId, page: 1 });

  
  const myTicketsEvents = myTickets?.data.map((e: IOrder) => e.eventId);




  return (
    <>
      {/* My Tickets */}
      <section>
        <div className="container max-w-[1140px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl md:text-3xl">My Tickets</h3>
            <Button>Discover More Events</Button>
          </div>
            <EventsCollection
              data={myTicketsEvents}
              emptyTitle="No event tickets purchased yet"
              subEmptyTitle="No worries - plenty of exciting events to explore!"
              page={1}
              limit={3}
              totalPages={1}
              type="My_Tickets"
            />
        </div>
      </section>

      {/* Events Organized */}
      <section>
        <div className="container max-w-[1140px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl md:text-3xl">My Events</h3>
            <Link href={"/events/create"}>
              <Button>Create New Event</Button>
            </Link>
          </div>
            <EventsCollection
              data={myEvents.results}
              emptyTitle="No events have been created yet"
              subEmptyTitle="Go create some now"
              limit={3}
              page={1}
              type="Events_Organized"
              totalPages={1}
            />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
