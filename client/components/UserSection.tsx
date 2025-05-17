import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SelectStore } from "./SelectStore";
import { ModeToggle } from "./ModeToggle";

export default function UserSection() {
  return (
    <div className="flex items-center justify-between gap-10 px-5 py-2">
      <div>
        <h1 className="text-2xl">Xush kelibsiz John!</h1>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <SelectStore />
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
