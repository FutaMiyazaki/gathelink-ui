import { string, z } from 'zod'

export const editFolderFormSchema = z.object({
  name: string()
    .min(1, 'フォルダ名は必須です')
    .max(30, 'フォルダ名は 30 文字以下で入力してください')
    .trim(),
  description: string().max(200, '説明は 200 文字以下で入力してください').trim(),
})

export type EditFolderForm = z.infer<typeof editFolderFormSchema>
