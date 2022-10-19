export const authValidationRules = {
  email: {
    required: 'メールアドレスは必須です',
    maxLength: {
      value: 254,
      message: 'メールアドレスは254文字以下で入力してください',
    },
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      message: '不正なメールアドレスの形式です',
    },
  },
  password: {
    required: 'パスワードは必須です',
    minLength: {
      value: 8,
      message: '8文字以上で入力してください',
    },
    maxLength: {
      value: 32,
      message: '32文字以下で入力してください',
    },
    pattern: {
      value: /^[a-zA-Z0-9.?/-]{8,24}$/,
      message: 'パスワードは半角英字と、数字または記号を組み合わせてください',
    },
  },
  name: {
    required: 'ニックネームは必須です',
    maxLength: {
      value: 32,
      message: 'パスワードは32文字以下で入力してください',
    },
  },
}
