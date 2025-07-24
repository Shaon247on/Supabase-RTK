"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginSchema } from "@/schema/login.schema";
import { supabase } from "@/supabase/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSetCookieMutation } from "@/services/cookiesSlice";
import { useDispatch } from "react-redux";
import { setSession } from "@/services/authSlice";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const redirect = useRouter();
  const dispatch = useDispatch()
  const [setCookie] = useSetCookieMutation()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("form errro:", form.formState.errors);
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log("submitted data", data);
    const email = data.email || "";
    const password = data.password || "";
    const { error, data: sessionData } = await supabase.auth.signInWithPassword(
      { email, password }
    );
    if (error || !sessionData?.session?.access_token) {
      console.error("Login failed:", error?.message);
      toast.error("Login failed. Check credentials.");
      return;
    }

    const access_token = sessionData?.session?.access_token;

    if (access_token) {
     await setCookie({access_token})
    }
    dispatch(setSession(sessionData));
    redirect.push("/supabase");
    toast.success("Wellcome back! You are logged in.");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Login</Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="./register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
