import React from 'react';
import Image from "next/image";
import logo from "@/public/Logo.png"

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
      <header className="bg-[#556573] py-5 mb-5">
          <Image src={logo} alt={"logo"} />
      </header>
  );
};