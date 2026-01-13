"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchFilterProps {
  placehlder?: string;
  paramName?: string;
}

export default function SearchFilter({
  placehlder = "Search ....",
  paramName = "searchTerm",
}: SearchFilterProps) {
  const serachParams = useSearchParams();
  const [value, setValue] = useState(serachParams.get(paramName) || "");
  return (
    <div>
      <Search />
      <Input
        placeholder={placehlder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
}
