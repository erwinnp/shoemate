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
import { signInSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/types";
import { fetchUsers } from "@/service/apiUser";
import { storeUser } from "@/actions/auth";
import Link from "next/link";

export function SignInForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      //Get data semua user
      const users: IUser[] = await fetchUsers();
      //Mencocokan data user (email dan password) dengan inputan dari user
      const user = users.find(
        (user: IUser) =>
          user.email === values.email && user.password === values.password
      );

      //Jika user cocok masukkan data user ke cookie (id, email, dan username), jika tidak tampilkan pesan invalid email dan password
      if (user) {
        const req = {
          id: user.id!,
          email: user.email,
          username: user.username,
        };

        await storeUser(req);
      } else {
        toast({
          title: "Invalid email or password",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Dont have an account?{" "}
          <span>
            <Link href="/signup" className="font-medium underline">
              Sign up here
            </Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
