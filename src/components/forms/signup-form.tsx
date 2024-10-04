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
import { fetchUsers, registerUser } from "@/service/apiUser";
import { signUpSchema } from "@/lib/form-schema";
import { storeUser } from "@/actions/auth";
import Link from "next/link";

export function SignUpForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      //Get data semua user
      const users: IUser[] = await fetchUsers();

      // Cek username sudah dipakai atau belum
      const usernameExists = users.some(
        (user) => user.username === values.username
      );
      if (usernameExists) {
        toast({
          title: "Error",
          description: "Username already taken",
          variant: "destructive",
        });
        return;
      }

      // Cek email sudah dipakai atau belum
      const emailExists = users.some((user) => user.email === values.email);
      if (emailExists) {
        toast({
          title: "Error",
          description: "Email already taken",
          variant: "destructive",
        });
        return;
      }

      //jika email dan username belum ada, bisa melakukan register
      const newUser = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (newUser) {
        const req = {
          id: newUser.id!,
          email: newUser.email,
          username: newUser.username,
        };

        await storeUser(req);
      } else {
        toast({
          title: "Error",
          description: "Sign up failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your email below to create new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?{" "}
          <span>
            <Link href="/signin" className="font-medium underline">
              Sign in here
            </Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
