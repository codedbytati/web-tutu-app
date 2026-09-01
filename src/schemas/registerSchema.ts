import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(4, "Informe o seu nome completo"),
  email: z.email("Informe um endereço de e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
