import EventForm from "@/components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";

interface IProps {
  params: {
    id: string;
  };
}

const UpdateEventPage = async ({ params: { id } }: IProps) => {
  const event = await getEventById(id);

  return (
    <section className="mt-32">
      <h2 className="font-semibold text-xl text-center">Event Update</h2>
      <EventForm type={"update"} event={event.results} />
    </section>
  );
};

export default UpdateEventPage;
