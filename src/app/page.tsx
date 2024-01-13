import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full">
      <section className="h-[100vh]  md:h-[70vh] bg-primary/5 bg-contain ">
        <div className="container grid grid-cols-1 md:grid-cols-2 mt-24 py-8">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="font-bold text-4xl">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="text-2xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
            asChild
            className="w-full mt-8 md:mt-0 md:w-fit"
            >
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

      <section id="events" className="">
        <h2 className="font-bold text-4xl">
          Trust by <br /> Thousands of Events
        </h2>
      </section>
    </main>
  );
}
