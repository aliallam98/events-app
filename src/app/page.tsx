import FilterByCategory from "@/components/FilterByCategory";
import SearchInput from "@/components/SearchInput";
import EventsCollection from "@/components/events/EventsCollection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { ApiFeatures } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const x = ApiFeatures(searchParams);

  const events = await getAllEvents(x);

  return (
    <>
      <section className="h-[100vh]  md:h-[70vh] bg-primary/5 bg-contain">
        <div className="container max-w-[1140px] grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="font-bold text-4xl">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="text-2xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button asChild className="w-full mt-8 md:mt-0 md:w-fit">
              <Link href={"#events"}>Explore Now</Link>
            </Button>
          </div>
          <div className="mt-8">
            <Image
              className="max-h-[40vh] md:max-h-[50vh] object-contain object-center"
              alt="Hero image"
              width={1000}
              height={1000}
              src={"/assets/images/hero.png"}
            />
          </div>
        </div>
      </section>

      <section id="events" className="py-10">
        <div className="container max-w-[1140px]">
          <h2 className="font-bold text-4xl">
            Trust by <br /> Thousands of Events
          </h2>
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
    </>
  );
}
