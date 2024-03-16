import { IEvent } from "@/lib/database/models/Event.Model";
import Card from "./Card";
import Pagination from "../Pagination";

interface IProps {
  data: IEvent[];
  emptyTitle: string;
  subEmptyTitle: string;
  page: string | number;
  limit: string | number;
  totalPages: string | number;
  type?: "Events_Organized" | "My_Tickets" | "All_Events";
}

const EventsCollection = ({
  data,
  emptyTitle,
  subEmptyTitle,
  type,
  totalPages,
  page,
}: IProps) => {
  if (!data) {
    return null;
  }

  return (
    <section className="py-10">
      {data.length > 0 && data ? (
        <>
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
            {data.map((e) => {
              const hasOrderLink = type === "Events_Organized";
              const hidePrice = type === "My_Tickets";
              return (
                <Card
                  key={e._id}
                  event={e}
                  hasOrderLink={hasOrderLink}
                  hidePrice={hidePrice}
                />
              );
            })}
          </div>

          <Pagination totalPages={totalPages} page={page} />
        </>
      ) : (
        <div className="flex flex-col gap-y-4 justify-center items-center mt-8">
          <h3 className="font-semibold text-2xl">{emptyTitle}</h3>
          <p className="text-xl">{subEmptyTitle}</p>
        </div>
      )}
    </section>
  );
};

export default EventsCollection;
