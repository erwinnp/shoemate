"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addShoeSchema, TAddShoeValue } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { IShoe } from "@/types";
import { createShoe } from "@/service/apiShoe";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AddShoeForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  //Menambahkan data sepatu baru
  const addNewShoe = useMutation({
    mutationFn: async (newShoe: IShoe) => await createShoe(userId, newShoe),
    onSuccess: () => {
      toast({
        title: "New shoe!",
        description: "Shoe created successfully!",
      });
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create shoe",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof addShoeSchema>>({
    resolver: zodResolver(addShoeSchema),
    defaultValues: {
      shoe_name: "",
      shoe_status: "Keep",
      shoe_size: 0,
      shoe_value: 0,
    },
  });

  async function onSubmit(values: TAddShoeValue) {
    addNewShoe.mutate(values);
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add new shoe</CardTitle>
        <CardDescription>Enter your new shoe here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="shoe_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shoe name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nike blazer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shoe_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shoe size (UK)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shoe_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shoe value ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="20000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shoe_status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Shoe status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Keep" />
                        </FormControl>
                        <FormLabel className="font-normal">Keep</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="OnSale" />
                        </FormControl>
                        <FormLabel className="font-normal">onSale</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Sold" />
                        </FormControl>
                        <FormLabel className="font-normal">Sold</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-6">
              Add this shoe
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link
          href={"/dashboard"}
          className="text-center hover:underline transition"
        >
          Back to dashboard
        </Link>
      </CardFooter>
    </Card>
  );
}
