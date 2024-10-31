import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/store";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    const success = await login(data.email, data.password);
    if (success) {
      console.log("Вход успешен");
      router.push("/profile");
    } else {
      alert("Не удалось войти. Проверьте почту и пароль");
    }
  };

  return (
    <div className="w-[1000px] bg-white rounded-3xl py-20 mx-auto">
      <h1 className="mb-5 text-[#0F314E] font-bold text-6xl text-center">
        Авторизация
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[410px] flex flex-col gap-5 mx-auto"
      >
        <div className="flex flex-col gap-2">
          <label className="text-[#0F314E] font-semibold text-xl">
            E-mail:
          </label>
          <select
            className="bg-[#E7E7E7] h-[44px] pl-4 text-xl rounded-lg"
            {...register("email")}
          >
            <option value="scammer@mail.ru">scammer@mail.ru</option>
            <option value="victim@mail.ru">victim@mail.ru</option>
          </select>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#0F314E] font-semibold text-xl">
            Пароль:
          </label>
          <input
            className="bg-[#E7E7E7] h-[44px] pl-4 text-xl rounded-lg"
            type="password"
            {...register("password", { required: "Введите пароль" })}
            placeholder="Пароль"
          />
          {errors.password && (
            <span className="text-red-700 font-semibold">
              {errors.password.message}
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
    </div>
  );
};

export default LoginForm;
