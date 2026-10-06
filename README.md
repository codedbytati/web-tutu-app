# Tutu App

Aplicação de gerenciamento financeiro com frontend React/Vite e API Node/Express.

## Arquitetura

O frontend usa uma separação por camadas:

```text
src/
  domain/          Entidades, contratos e casos de uso sem dependências de UI
  services/        Chamadas de API e autenticação, agrupadas pelo endpoint
  presentation/   Páginas, layouts e componentes de interface
  contexts/       Estado de autenticação e composição da aplicação
  store/          Estado global de cliente com Zustand
```

As chamadas para os endpoints de contas, cartões e transações ficam em `services/account`, pois usam a raiz `/account`. A autenticação Firebase fica em `services/login`. React Query gerencia o estado remoto, enquanto o estado local permanece nos componentes/hooks de apresentação.
Zustand gerencia somente estado global de cliente, como o layout do sidebar; ele não duplica contas, cartões ou transações.

## Performance

- Páginas são carregadas com lazy loading e code splitting.
- Rotas e dados de contas/transações são pré-carregados após autenticação e ao focar/passar o mouse no menu.
- Cache usa `staleTime` e `gcTime` específicos por recurso.
- O cache é limpo no logout.
- O gráfico de Análises e ApexCharts são carregados somente quando necessários.
- Edição e exclusão de transações usam atualização otimista com rollback em caso de erro.
- O estado de layout usa seletores de uma store Zustand para limitar re-renderizações.

## Segurança

- Firebase é o gateway principal de autenticação do frontend.
- O fluxo legado do backend usa hash `scrypt` com salt e comparação em tempo constante.
- Senhas não são incluídas em respostas ou tokens JWT.
- O segredo JWT deve ser fornecido por `JWT_SECRET`.
- CORS é controlado por `CORS_ORIGINS`.
- O backend aplica limite de payload, headers de segurança e rate limiting no login.
- Recursos financeiros são sempre filtrados pelo usuário autenticado no backend.
- O endpoint JWT legado permanece compatível durante a migração, mas exige `JWT_SECRET`; o fluxo principal usa Firebase ID Tokens.

## Execução

Frontend:

```powershell
npm.cmd install
npm.cmd run dev
```

Backend:

```powershell
Set-Location backend
npm.cmd install
npm.cmd run dev
```

Variáveis principais do backend:

```text
MONGO_URI=
FIREBASE_SERVICE_ACCOUNT_BASE64=
JWT_SECRET=
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Validação

```powershell
npm.cmd run build
npm.cmd run lint
Set-Location backend
npm.cmd test -- --forceExit
```

O `--forceExit` é necessário atualmente porque a suíte existente deixa handles assíncronos abertos após os testes, embora os testes sejam concluídos com sucesso.

## Desenvolvimento

O projeto foi originalmente criado com Vite e React. A configuração de desenvolvimento abaixo permanece disponível para referências do ecossistema:

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```
