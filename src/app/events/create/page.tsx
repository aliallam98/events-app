import EventForm from "@/components/EventForm";
import React from "react";

const page = () => {
  return (
    <section className="mt-32">
      <h2 className="font-semibold text-xl text-center">Create An Event</h2>
      <EventForm/>
    </section>
  );
};

export default page;
