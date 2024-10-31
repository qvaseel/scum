import useAuthStore from "@/store/store";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const exit = () => {
    logout().then(() => {
      router.push("/");
    });
  };

  return (
    <button
      onClick={() => exit()}
      className="bg-[#F13737] w-fit text-white font-semibold text-center py-2 px-8 cursor-pointer hover:bg-red-950 rounded-lg"
    >
      Выход
    </button>
  );
};

export default Logout;
