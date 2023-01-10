import { number, string, z } from 'zod'

export const editLinkFormSchema = z.object({
  url: string()
    .min(1, 'URL は必須です')
    .max(1000, 'URL は 1000 文字以下で入力してください')
    .url('URL の形式に誤りがあります')
    .trim(),
  title: string().max(100, 'タイトルは 100 文字以下で入力してください').trim(),
  folderId: number().positive('フォルダは必須です'),
})

export type EditLinkForm = z.infer<typeof editLinkFormSchema>
