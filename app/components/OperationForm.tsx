import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OperationRequest, User } from "@/interface";
import { useOperationStore } from "@/store/store";

interface Props {
  users: User[];
  user: User;
}

export const OperationForm = ({ users, user }: Props) => {

  const [userTo, setUserTo] = useState<User>();

    useEffect(() => {
        if (user?.email == "scammer@mail.ru") {
            setUserTo(users[0]);
            console.log(users[0], userTo)

        } else {
            setUserTo(users[1]);
            console.log(users[1], userTo)
        }
    }, [])

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<OperationRequest>({
    defaultValues:{
        to: userTo?.id,
        from: user?.id
    }
  });
  const { createOperation } = useOperationStore();

  const onSubmit = async (data: OperationRequest) => {

    if (data.to == '') {
        data.to = userTo?.id
    }

    const success = await createOperation(data);
    if (success) {
      console.log("платеж проведен");
    } else {
      alert("Не удалось провести оплату");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[410px] flex flex-col gap-5 mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label className="text-[#0F314E] font-semibold text-xl">Кому</label>
        <select
          className="bg-[#E7E7E7] h-[44px] pl-4 text-xl rounded-lg"
          {...register("to")}
        >
          <option value={userTo?.id}>{userTo?.email}</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[#0F314E] font-semibold text-xl">Сколько:</label>
        <input
          className="bg-[#E7E7E7] h-[44px] pl-4 text-xl rounded-lg"
          type="text"
          {...register("amount", { required: "Введите сумму" })}
          placeholder="Сумма"
        />
        {errors.amount && (
          <span className="text-red-700 font-semibold">
            {errors.amount.message}
          </span>
        )}
      </div>
      <button
        className="mt-10 w-full text-center bg-[#379CF1] hover:bg-[#2E81C7] cursor-pointer rounded-lg text-lg font-semibold h-[44px] text-white"
        type="submit"
      >
        Войти
      </button>
    </form>
  );
};
