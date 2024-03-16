//Use URL for handling entire URLs, including their structure and components.
//Use searchParams for specifically working with query parameters.

"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const SearchInput = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [searchKey, serSearchKey] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let newUrl = "";

    const delayDebounceFunction: any = setTimeout(() => {
      if (searchKey) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchKey,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFunction);
  }, [searchKey, searchParams, router]);

  return (
    <div className="flex items-center gap-2 w-full md:max-w-[400px] bg-neutral-100 rounded-3xl px-4">
      <Search size={20} />
      <Input
        className="bg-transparent border-none"
        value={searchKey}
        onChange={(e) => serSearchKey(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;

// formUrlQuery
// removeKeysFromQuery
