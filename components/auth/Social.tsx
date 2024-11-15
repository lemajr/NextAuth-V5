'use client'

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"

const Social = () => {

  return (
    <div className="flex items-center w-full gap-x-2"> 
    <Button
    size="lg"
    className="w-full"
    variant="outline"
    onClick={()=> signIn('google')}
    

    >
        <FcGoogle className="size-5"/>
    </Button>
    <Button 
    size="lg"
    className="w-full"
    variant="outline"
    onClick={()=> signIn("github")}
    >
        <FaGithub className="size-5"/>
    </Button>
    </div>
  )
}

export default Social