import FilterByCategory from "@/components/FilterByCategory";
import SearchInput from "@/components/SearchInput";
import Card from "@/components/events/Card";
import EventsCollection from "@/components/events/EventsCollection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { ApiFeatures } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import React from "react";

const EventsPage = async ({ searchParams }: SearchParamProps) => {
  const x = ApiFeatures(searchParams);
  const events = await getAllEvents(x);
  // console.log(events);

  return (
    <section className="mt-32 pb-10">
      <div className="container max-w-[1140px]">
        <h1 className="font-semibold text-center text-2xl md:text-3xl lg:text-5xl">
          Discover All Events
        </h1>
        <div className=" flex flex-col md:flex-row gap-4 md:justify-around mt-6">
          <SearchInput />
          <FilterByCategory />
        </div>
        <EventsCollection
          data={events.results}
          emptyTitle="No events have been created yet"
          subEmptyTitle="Come Back Later"
          page={events.page}
          limit={6}
          totalPages={events.totalPage}
          type="All_Events"
        />
      </div>
    </section>
  );
};

export default EventsPage;
