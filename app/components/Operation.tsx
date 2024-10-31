import React from 'react';
import { OperationResponse } from '@/interface';


export const Operation = ({  from, to, amount, operateAt }: OperationResponse) => {
    const date = new Date(operateAt);
    const formattedDate = date.toLocaleDateString("ru-RU", {
        hour: "2-digit",
        second: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  return (
      <div className="flex flex-col p-3 gap-5 border-2 rounded-xl w-full">
        <p className="text-[#0F314E] font-semibold text-xl">От кого: {from}</p>
        <p className="text-[#0F314E] font-semibold text-xl">Кому: {to}</p>
        <p className="text-[#0F314E] font-semibold text-xl">Сколько: {amount}</p>
        <p className="text-[#0F314E] font-semibold text-xl">Когда: {formattedDate}</p>
      </div>
  );
};