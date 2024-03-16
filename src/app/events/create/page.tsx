import EventForm from "@/components/EventForm";
import React from "react";

const CreateEventPage = () => {
  return (
    <section className="mt-32 pb-10">
      <div className="container">
        <h2 className="font-semibold text-xl text-center">Create An Event</h2>
        <EventForm type={"Create"} />
      </div>
    </section>
  );
};

export default CreateEventPage;
