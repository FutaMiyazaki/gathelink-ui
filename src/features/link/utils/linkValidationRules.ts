export const linkValidationRules = {
  title: {
    maxLength: {
      value: 100,
      message: 'タイトルは100文字以下で入力してください',
    },
  },
  url: {
    required: 'URLは必須です',
    maxLength: {
      value: 1000,
      message: 'リンクは1000文字以下で入力してください',
    },
    pattern: {
      value: /^https?:\/\/[\w/:%#$&?()~.=+-]+$/,
      message: 'URL の入力形式が正しくありません',
    },
  },
  folder: {
    required: 'フォルダは必須です',
  },
}
