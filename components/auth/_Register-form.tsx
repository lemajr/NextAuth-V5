"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CardWrapper from './Card-wrapper'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RegisterSchema } from "@/app/schemas"
import { Input } from "../ui/input"
import { z } from "zod"
import { FormSuccess } from "../Success"
import { FormError } from "../Form-error"
import { useState, useTransition } from "react"
import { register } from "@/action/register"
import { BiLoaderAlt } from "react-icons/bi"

const RegisterForm = () => {

  const [isPending, startTransaction] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })


  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError("");
    setSuccess("");

    // Start the transition
    startTransaction(async () => {
      try {
        const data = await register(values);

        // Check for errors or success messages in the response
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
        }
      } catch (err) {
        // Handle unexpected errors
        setError("An unexpected error occurred.");
        console.error(err);
      }
    });
  }
  return (
    <div>
      <CardWrapper
        headerLabel="Create an Account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl >
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="lema jr"
                        type="name"
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl >
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="lemajr@gmail.com"
                        type="email"
                      />
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
                    <FormControl >
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className={`w-full flex items-center justify-center ${isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              type="submit"
            >
              {isPending ? (
                <>
                  <BiLoaderAlt className="animate-spin h-5 w-5 mr-2" />
                  Processing
                </>
              ) : (
                "Register"
              )}
            </Button>

          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default RegisterForm