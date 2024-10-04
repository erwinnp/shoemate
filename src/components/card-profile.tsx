"use client";
import { fetchUsersById } from "@/service/apiUser";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function CardProfile({ userId }: { userId: string }) {
  // Get data user menggunakan id dari cookie
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => await fetchUsersById(userId),
  });

  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <Card className="max-w-sm mx-auto w-full">
      <CardHeader>
        <CardTitle>My profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-xl">{data?.username}</h1>
            <Badge>{data?.email}</Badge>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={"/dashboard"}>Back to dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
