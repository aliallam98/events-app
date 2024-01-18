import { IEvent } from "@/lib/database/models/Event.Model";
import Card from "./Card";

interface IProps {
  data: IEvent[];
  emptyTitle: string;
  subEmptyTitle: string;
  page: string | number
  limit : string | number
  totalPages: string | number;
  type: string;
}

const EventsCollection = ({ data, emptyTitle, subEmptyTitle }: IProps) => {
  console.log(data);
  
  
  return (
    <section className="py-10">
      {data.length > 0 ? ( 
        <div className="container grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {data.map((e) => (
            <Card key={e._id} event={e} />
          ))}
        </div>
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
