"use client";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { removeSession } from "@/actions/auth";
import Link from "next/link";

export default function DropdownUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => removeSession()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
