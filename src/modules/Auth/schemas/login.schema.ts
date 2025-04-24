import { z } from 'zod';
import { t } from 'i18next';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: t('login.error.emailRequired') })
    .email({ message: t('login.error.emailInvalid') }),
  password: z
    .string()
    .min(1, { message: t('login.error.passwordRequired') })
    .min(8, { message: t('login.error.passwordMinLength') }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
