import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um endereço de e-mail válido"),
  password: z
    .string()
    .min(6, "Informe a senha cadastrada com pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
