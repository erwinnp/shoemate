"use client";
import { fetchShoesByUser } from "@/service/apiShoe";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import DialogDeleteShoe from "./dialog-delete-shoe";

export default function TableShoes({ userId }: { userId: string }) {
  //Get semua data sepatu yang dimiliki oleh user
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shoes", userId],
    queryFn: async () => await fetchShoesByUser(userId),
  });

  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center px-7">
        <div>
          <CardTitle className="text-xl">Your shoes</CardTitle>
          <CardDescription className="text-sm max-sm:max-w-72">
            Keep your shoes organized and manage your shoe collection
          </CardDescription>
        </div>
        <Button asChild>
          <Link href={"/dashboard/add-shoe"}>Add shoe</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shoe name</TableHead>
              <TableHead className="hidden md:table-cell">Shoe size</TableHead>
              <TableHead className="hidden sm:table-cell">Shoe value</TableHead>
              <TableHead className="hidden md:table-cell">
                Shoe status
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <div className="font-medium">Loading...</div>
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((shoe) => (
                <TableRow key={shoe.id}>
                  <TableCell>
                    <div className="font-medium">{shoe.shoe_name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {shoe.shoe_size}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {shoe.shoe_value}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {shoe.shoe_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-4 justify-end">
                    <Button size="sm" variant="ghost">
                      <Link href={`/dashboard/edit-shoe/${shoe.id}`}>Edit</Link>
                    </Button>
                    <DialogDeleteShoe shoeId={shoe.id!} userId={userId} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Empty shoe</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
