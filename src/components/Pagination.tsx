"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface IProps {
  page: string | number;
  totalPages: string | number;
  urlParamName?: string;
}

const Pagination = ({ urlParamName, page, totalPages }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const onClickHandler = (value: string) => {
    const pageValue = value === "prev" ? Number(page) - 1 : Number(page) + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex justify-center items-center gap-x-10 mt-10">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("prev")}
        disabled={Number(page) <= 1}
      >
        Prev
      </Button>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("next")}
        disabled={Number(page) >= Number(totalPages)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
