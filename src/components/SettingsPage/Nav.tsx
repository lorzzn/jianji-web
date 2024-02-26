import { FC, ReactNode } from "react";

interface NavProps {
  children: ReactNode
}

const Nav:FC<NavProps> = ({ children }) => {


  return <div className="flex flex-col">
    {children}
  </div>
}

export default Nav
