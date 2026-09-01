import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin, useLogin } from "@tutu-hooks";
import { loginSchema, type LoginFormData } from "@tutu-schemas";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const { mutate: loginWithGoogle } = useGoogleLogin();
  const { mutate: loginUser } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: () => navigate("/"),
    });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    onGoogleRegister: handleGoogleLogin,
    onEmailProps: {
      ...register("email"),
      isInvalid: Boolean(errors.email),
      errorMessage: errors.email?.message,
    },
    onPasswordProps: {
      ...register("password"),
      isInvalid: Boolean(errors.password),
      errorMessage: errors.password?.message,
    },
  };
};
