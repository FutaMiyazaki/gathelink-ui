import { string, z } from 'zod'

export const loginFormSchema = z.object({
  email: string()
    .min(1, 'メールアドレスは必須です')
    .email('メールアドレスの形式が正しくありません')
    .trim(),
  password: string()
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは 8 文字以上で入力してください')
    .max(32, 'パスワードは 32 文字以下で入力してください')
    .trim(),
})

export type LoginForm = z.infer<typeof loginFormSchema>
