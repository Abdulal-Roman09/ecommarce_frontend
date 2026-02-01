"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SelectFilterProps {
  paramName: string;
  placeholder?: string;
  options: { lable: string; value: string }[];
}

export default function SelectFilter({
  paramName,
  placeholder,
  options,
}: SelectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentValude = searchParams.get(paramName) || "All";

  const hendelChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(paramName);
    } else if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select
      value={currentValude}
      onValueChange={hendelChange}
      disabled={isPending}
    >
      <SelectTrigger className="border border-primary/30">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.lable}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
