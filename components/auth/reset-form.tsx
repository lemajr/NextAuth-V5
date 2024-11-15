"use client";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import { useState } from "react";
import { ResetSchema } from "@/app/schemas";
import { reset } from "@/action/reset";
import CardWrapper from "./Card-wrapper";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../Form-error";
import { FormSuccess } from "../Success";
import { Button } from "../ui/button";





export const ResetForm = ()=>{


    const [error, setError] = useState<string|undefined>("")
    const [success, setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (data: z.infer<typeof ResetSchema>)=>{
        setError("");
        setSuccess("");


        // console.log(data);
        reset(data).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
        });
    }


    return(
        <CardWrapper
        headerLabel="Forgot Password?"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
        >
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email"
                                    placeholder="gautam@example.com"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
                </form>
           </Form>
        </CardWrapper>
    )
}