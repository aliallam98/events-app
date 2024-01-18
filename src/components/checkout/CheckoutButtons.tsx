"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/Event.Model";
import Checkout from "./Checkout";

const CheckoutButtons = ({ event }: { event: IEvent }) => {
  const isEventEnded = false //new Date(event.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div>
      {isEventEnded ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild>
              <Link href={"/sign-in"}>Get Ticket</Link>
            </Button>
          </SignedOut>

          <SignedIn>
          <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButtons;
