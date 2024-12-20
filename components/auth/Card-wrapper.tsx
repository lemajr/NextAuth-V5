"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import { Header } from "./Header";
import Social from "./Social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial 
  }: CardWrapperProps
) => {

  return (
    <Card className="lg:w-[400px] w-[350px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent >

        { children}
      </CardContent>
      <CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
      </CardContent>
      <CardFooter>
        <BackButton
        label={backButtonLabel}
        href={backButtonHref}
        
        />
      </CardFooter>
      
    </Card>
  )
}

export default CardWrapper