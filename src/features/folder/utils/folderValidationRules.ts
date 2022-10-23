export const folderValidationRules = {
  name: {
    required: 'フォルダ名を入力してください',
    maxLength: {
      value: 30,
      message: 'フォルダ名は30文字以下で入力してください',
    },
  },
}
