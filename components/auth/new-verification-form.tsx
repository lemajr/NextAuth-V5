"use client";

import { newVerification } from "@/action/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CardWrapper from "./Card-wrapper";
import { FormSuccess } from "../Success";
import { FormError } from "../Form-error";
import {PulseLoader} from "react-spinners";



export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const search = useSearchParams();

    const token = search.get("token");

    const onSubmit = useCallback(()=>{
        // console.log(token);
        if(!token){
            setError("token is required");
            return;
        }
        newVerification(token).then((res)=>{
            setSuccess(res.success);
            setError(res.error);
        })
        .catch((err)=>{
            setError(err.message);
        })
        
    },[token])

    useEffect(()=>{
        onSubmit();
    },[onSubmit])
    
    return (
       <CardWrapper
       headerLabel="Email Verification"
       backButtonHref="/auth/login"
       backButtonLabel="Back to login?"
       >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <PulseLoader size={10} />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}