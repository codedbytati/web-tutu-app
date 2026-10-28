export const getFirebaseAuthErrorMessage = (error: unknown) => {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
      ? error.code
      : undefined

  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado. Tente entrar ou use outro e-mail.'
    case 'auth/invalid-email':
      return 'Informe um endereço de e-mail válido.'
    case 'auth/weak-password':
      return 'A senha é muito fraca. Use uma senha com pelo menos 6 caracteres.'
    case 'auth/operation-not-allowed':
      return 'O cadastro por e-mail está desativado no Firebase. Ative o provedor Email/Password no console do projeto.'
    case 'auth/network-request-failed':
      return 'Não foi possível conectar ao serviço de autenticação. Verifique sua conexão.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.'
    default:
      return 'Não foi possível criar a conta. Verifique os dados e tente novamente.'
  }
}
