import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin, useRegisterUser } from '@tutu-hooks'
import { registerSchema, type RegisterFormData } from '@tutu-schemas'

type UseRegisterProps = {
  onRegistered: () => void
}

export const useRegister = ({ onRegistered }: UseRegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit'
  })

  const { mutate: registerUser } = useRegisterUser()
  const { mutate: loginWithGoogle } = useGoogleLogin()

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: onRegistered
    })
  }

  const handleGoogleRegister = () => {
    loginWithGoogle(undefined, {
      onSuccess: onRegistered
    })
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    onGoogleRegister: handleGoogleRegister,
    onNameProps: {
      ...register('fullName'),
      isInvalid: Boolean(errors.fullName),
      errorMessage: errors.fullName?.message
    },
    onEmailProps: {
      ...register('email'),
      isInvalid: Boolean(errors.email),
      errorMessage: errors.email?.message
    },
    onPasswordProps: {
      ...register('password'),
      isInvalid: Boolean(errors.password),
      errorMessage: errors.password?.message
    }
  }
}
