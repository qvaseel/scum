import React, { useEffect } from "react";
import { Operation } from "./Operation";
import { useOperationStore, useUserStore } from "@/store/store";
import { OperationResponse, User } from "@/interface";

interface Props {
  className?: string;
  users: User[];
}

export const OperationList: React.FC<Props> = ({ className, users }) => {
  const { operations, findAllOperations } = useOperationStore();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        if (user) {
          await findAllOperations(user?.id);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchOperations();
  }, []);

  if (!operations) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {operations.map((item: OperationResponse, index) => (
        <Operation
          key={index}
          id={item.id}
          from={(item.from == users[0]?.id) ? users[0]?.email : users[1]?.email}
          to={(item.to == users[0]?.id) ? users[0]?.email : users[1]?.email}
          amount={item.amount}
          operateAt={item.operateAt}
        />
      ))}
    </div>
  );
};
