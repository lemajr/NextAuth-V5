import { BsExclamationTriangle } from "react-icons/bs";
import CardWrapper from "./Card-wrapper";

export const ErrorCard = () => {
    return(
        <CardWrapper
        headerLabel="Something went wrong 😪"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login?"
        >
            <div className="w-full flex justify-center items-center">
                <BsExclamationTriangle className="w-10 h-10 text-destructive"/>
            </div>
        </CardWrapper>
    )
}

