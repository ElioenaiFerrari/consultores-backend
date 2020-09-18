module.exports = {
  email: {
    mustBeUnique: {
      code: 'EMAIL_MUST_BE_UNIQUE',
      message: 'Email já está em uso',
    },
    invalid: {
      code: 'INVALID_EMAIL',
      message: 'Email inválido',
    },
  },
  password: {
    invalid: {
      code: 'INVALID_PASSWORD',
      message: 'Senha inválida',
    },
  },
  user: {
    notFound: {
      code: 'USER_NOT_FOUND',
      message: 'Usuário não encontrado',
    },
  },
  auth: {
    invalidCredentials: {
      code: 'INVALID_CREDENTIALS',
      message: 'Credenciais inválidas',
    },
  },
};
