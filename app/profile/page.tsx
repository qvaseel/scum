"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Profile from "../components/Profile";
import React, { useEffect, useState } from "react";
import { OperationList } from "../components/OperationList";
import { OperationForm } from "../components/OperationForm";
import { useUserStore } from "@/store/store";
import { User } from "@/interface";

const ProfilePage = () => {
  const router = useRouter();
  const { users, getAllUsers, user, setUser } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await setUser();
        await getAllUsers();

        if (!response) {
          router.push('/') 
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        router.push('/') 
      }
    };

    fetchProfile();
  }, []);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("operation", "1");
    if (term) {
      params.set("operation", term);
    } else {
      params.delete("operation");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSearch("none");
  }, []);

  if (!user) return <p>Loading</p>
  if (!users) return <p>Loading</p>

  return (
    <div className="w-full bg-white rounded-3xl p-16 flex justify-between">
      <Profile user={user} />
      {searchParams.get("operation") == "none" && (
        <div className="border-2 rounded-3xl w-1/2 flex flex-col p-5 gap-5 items-center">
          <h2 className="text-[#0F314E] font-semibold text-2xl">Операции</h2>
          <button
            onClick={() => handleSearch("pay")}
            className="bg-[#379CF1] text-white font-semibold text-center py-2 px-8 cursor-pointer hover:bg-red-950 rounded-lg"
          >
            Перевести деньги
          </button>
          <button
            onClick={() => handleSearch("history")}
            className="bg-[#379CF1]  text-white font-semibold text-center py-2 px-8 cursor-pointer hover:bg-red-950 rounded-lg"
          >
            История переводов
          </button>
        </div>
      )}
      {searchParams.get("operation") == "pay" && (
        <div className="w-1/2">
          <button
            className="rounded-xl mb-3 bg-slate-200 hover:bg-slate-300 font-semibold py-2 px-3"
            onClick={() => handleSearch("none")}
          >
            К операциям
          </button>
          <OperationForm users={users} user={user}/>
        </div>
      )}
      {searchParams.get("operation") == "history" && (
        <div className="w-1/2">
          <button
            className="rounded-xl mb-3 bg-slate-200 hover:bg-slate-300 font-semibold py-2 px-3"
            onClick={() => handleSearch("none")}
          >
            К операциям
          </button>
          <OperationList users={users} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
