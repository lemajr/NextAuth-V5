"use client"

import { logout } from "@/action/logout";


interface LogoutButtonProps {
children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {

    const onClick=()=>{
        logout();
    }
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};