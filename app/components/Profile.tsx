"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import Logout from "../components/Logout";
import { useUserStore } from "@/store/store";
import { User } from "@/interface";

interface Props {
    user: User;
}

const Profile = ({user}: Props) => {

  return (
    <div className="flex flex-col gap-5">
        <h1 className="text-[#0F314E] font-bold text-3xl">Вы вошли в профиль:</h1>
        <p className="text-[#0F314E] font-semibold text-xl">E-mail: {user.email}</p>
        <p className="text-[#0F314E] font-semibold text-xl">Баланс: {user.balance} копеек</p>
       
        <Logout/>
    </div>
  );
};

export default Profile;
