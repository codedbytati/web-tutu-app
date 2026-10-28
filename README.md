# tutu app

O tutu app é um organizador financeiro com o objetivo de facilitar a administração de finanças proporcionando uma interface simples, amigável e intuitiva aos usuários.

Aplicação com frontend React/Vite e API Node.js/Express. O sistema permite autenticação, gerenciamento de contas e cartões, cadastro de receitas, despesas e transferências, além de análises financeiras.

## Funcionalidades

- Cadastro e login com Firebase Authentication;
- Login social com Google;
- Contas bancárias e cartões;
- Criação, edição e exclusão de transações;
- Receitas, despesas e transferências;
- Filtros e busca de transações;
- Resumo de saldo, receitas e despesas;
- Análises financeiras com gráfico;
- Rotas protegidas para usuários autenticados;
- Interface responsiva baseada em Tailwind CSS.

## Estrutura do projeto

```text
.
├── src/                         # Frontend React/Vite
│   ├── contexts/                # Contexto de autenticação
│   ├── data/                    # Modelos das respostas remotas
│   ├── domain/                  # Tipos usados pelo domínio
│   ├── presentation/            # Páginas, layouts, componentes e UI
│   ├── routes/                  # Router, páginas lazy e preload
│   ├── services/                # API, Firebase, React Query e mutations
│   ├── schemas/                 # Schemas de validação dos formulários
│   └── utils/                   # Utilitários compartilhados
├── backend/                     # API Node.js/Express
│   ├── src/controller/          # Controllers HTTP
│   ├── src/feature/             # Operações de negócio
│   ├── src/infra/               # MongoDB, Firebase Admin e segurança
│   ├── src/middleware/          # Segurança e rate limiting
│   └── tests/                   # Testes de integração
├── .env.example                 # Variáveis do frontend
└── backend/.env.example         # Variáveis do backend
```

### Organização arquitetural atual

O frontend possui uma separação inicial entre apresentação, domínio, dados e serviços. Os hooks em `services` integram chamadas HTTP, Firebase Authentication e React Query.

Essa organização ainda não representa uma Clean Architecture completa: não há uma camada formal de casos de uso, interfaces de repositório ou entidades de domínio independentes do React. O React Query gerencia o estado remoto; o estado de autenticação usa React Context; formulários usam React Hook Form; e o estado local de interface usa hooks do React.

## Rotas

### Públicas

- `/login` — login com e-mail/senha ou Google;
- `/cadastro` — cadastro de usuário.

### Protegidas

- `/` — página inicial;
- `/transacoes` — lista, busca e filtros de transações;
- `/analises` — análises e gráfico financeiro;
- `/cartoes` — contas e cartões;
- `/perfil` — perfil do usuário.

## Performance

- As páginas são carregadas com `React.lazy` e code splitting;
- O gráfico de análises é carregado sob demanda;
- Rotas são pré-carregadas ao passar o mouse ou receber foco nos links do menu;
- Em dispositivos touch, as rotas também são pré-carregadas ao iniciar o toque;
- Cada rota é pré-carregada no máximo uma vez por sessão da aplicação;
- Dados de contas e transações podem ser pré-carregados pelo React Query durante a navegação;
- O cache do React Query usa `staleTime`, `gcTime`, retry limitado e não refaz consultas ao focar a janela;
- Queries de contas e transações são invalidadas por um helper compartilhado após mutações;
- As mutations financeiras aguardam a invalidação e o refetch antes de concluir;
- Mutations financeiras não são repetidas automaticamente (`retry: 0`) para evitar duplicação de operações;
- O cache do React Query é limpo ao fazer logout.

Configuração atual do cache:

```text
staleTime: 30 segundos
gcTime: 5 minutos
retry: 1 tentativa
refetchOnWindowFocus: false
```

No último build validado, as páginas principais foram divididas em chunks entre
0,38 kB e 17,42 kB, enquanto o gráfico ApexCharts permanece isolado em um
chunk carregado sob demanda de aproximadamente 888 kB. O chunk inicial da
aplicação ficou em aproximadamente 554 kB. O aviso de tamanho do ApexCharts é
esperado e não bloqueia o carregamento das páginas que não exibem análises.

O layout público foi validado em viewport móvel de 390 x 844 px sem overflow
horizontal. As áreas autenticadas usam navegação horizontal no mobile e layout
em coluna, enquanto o layout desktop usa sidebar lateral.

## Decisões técnicas

- A estrutura de pastas existente foi preservada, sem reorganização do projeto;
- O React Query concentra o estado remoto, o React Context concentra a autenticação e o React Hook Form concentra os formulários;
- As chaves de query de contas e transações são centralizadas em `src/services/queryKeys.ts`;
- A invalidação financeira é compartilhada e aguardada pelas mutations para manter saldos e listas sincronizados;
- O carregamento de páginas e gráficos é feito sob demanda, com prefetch de rotas e dados durante a navegação;
- A configuração Web do Firebase é fornecida por variáveis `VITE_FIREBASE_*` para organização de ambientes, mas não é tratada como segredo;
- A autenticação do backend valida o usuário e restringe os recursos financeiros ao proprietário autenticado;
- A validação de entrada existe tanto nos schemas do frontend quanto nos middlewares do backend.

## Métricas e checklist de entrega

Resultados da validação final:

| Verificação                              | Resultado                 |
| ---------------------------------------- | ------------------------- |
| Build frontend                           | Passou                    |
| Lint frontend                            | Passou                    |
| Testes unitários frontend                | 14 testes passando        |
| Testes de integração backend             | 13 testes passando        |
| Formatação dos arquivos alterados        | Passou                    |
| Integridade do diff (`git diff --check`) | Passou                    |
| Navegação e cadastro em navegador        | Validado                  |
| Viewport mobile de 390 x 844 px          | Sem overflow horizontal   |
| Chunk inicial                            | Aproximadamente 553,82 kB |
| Chunk ApexCharts sob demanda             | Aproximadamente 888,28 kB |

O build frontend foi concluído em aproximadamente 2,8 segundos na última
execução local. Os testes frontend foram concluídos em aproximadamente 25,8
segundos e os testes backend em aproximadamente 14,3 segundos. Os tempos são
referências do ambiente local e podem variar entre máquinas.

## Limitações conhecidas

- A Clean Architecture é parcial: ainda não existem casos de uso e interfaces de repositório formais;
- O chunk do ApexCharts permanece grande, embora seja carregado apenas na página de análises;
- Alguns campos de formulário ainda podem evoluir para uma associação semântica mais completa entre `<label>` e controle;
- O `npm audit` ainda aponta vulnerabilidades transitivas que devem ser avaliadas em uma atualização de dependências separada, sem aplicar `npm audit fix --force` automaticamente.

## Segurança

- Firebase Authentication é usado como mecanismo principal de autenticação do frontend;
- O frontend envia o Firebase ID Token no header `Authorization` das requisições da API;
- O backend valida Firebase ID Tokens com Firebase Admin quando configurado;
- O backend mantém compatibilidade com o fluxo JWT legado;
- Senhas do fluxo legado são armazenadas com `scrypt`, salt aleatório e comparação em tempo constante;
- O backend aplica limite de payload JSON;
- Payloads de contas, cartões e transações são validados no backend, incluindo tipos, limites, valores e datas;
- CORS é controlado pela variável `CORS_ORIGINS`;
- O backend aplica headers básicos de segurança;
- Há rate limiting para as rotas de autenticação;
- Recursos financeiros são filtrados pelo usuário autenticado, e a listagem pública de usuários não está disponível;
- Credenciais do Firebase Admin, MongoDB e JWT devem permanecer somente no ambiente do backend.

A configuração Web do Firebase usa variáveis `VITE_FIREBASE_*`. Essas variáveis são incorporadas ao bundle do frontend e não devem ser tratadas como secrets. Segredos do Firebase Admin nunca devem ser expostos ao frontend.

## Pré-requisitos

- Node.js compatível com as versões usadas pelo projeto;
- npm;
- MongoDB para executar a API;
- Projeto Firebase configurado com Authentication habilitado.

## Configuração do frontend

Copie o arquivo de exemplo:

```powershell
Copy-Item .env.example .env
```

Preencha o `.env`:

```text
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

O arquivo `.env` é ignorado pelo Git. Use `.env.example` como referência e não commite valores de ambiente locais.

## Configuração do backend

Copie o arquivo de exemplo:

```powershell
Copy-Item backend\.env.example backend\.env
```

Preencha as variáveis:

```text
FIREBASE_SERVICE_ACCOUNT_BASE64=
MONGO_URI=
JWT_SECRET=
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

`FIREBASE_SERVICE_ACCOUNT_BASE64` deve conter as credenciais do Firebase Admin codificadas em Base64. Como alternativa, o backend também reconhece `FIREBASE_SERVICE_ACCOUNT_JSON`.

## Execução local

### Frontend

Na raiz do projeto:

```powershell
npm.cmd install
npm.cmd run dev
```

O frontend será disponibilizado pelo Vite, normalmente em `http://localhost:5173`.

### Backend

Em outro terminal:

```powershell
Set-Location backend
npm.cmd install
npm.cmd run dev
```

A API será disponibilizada, por padrão, em `http://localhost:3000`.

Para executar o backend em produção:

```powershell
Set-Location backend
npm.cmd start
```

## Scripts

### Frontend

```powershell
npm.cmd run dev       # Inicia o servidor de desenvolvimento
npm.cmd run build     # Executa type-check e build de produção
npm.cmd run lint      # Executa o ESLint
npm.cmd run preview   # Serve o build de produção localmente
npm.cmd run prettier  # Verifica a formatação
npm.cmd run test:unit # Executa os testes unitários do frontend
```

### Backend

```powershell
npm.cmd run dev       # Inicia com Nodemon
npm.cmd start         # Inicia em modo produção
npm.cmd test          # Executa os testes de integração
npm.cmd run docker    # Inicia serviços Docker, quando configurados
```

## Validação

Frontend:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run prettier
```

Backend:

```powershell
Set-Location backend
npm.cmd test
```

O frontend possui scripts de lint, type-check e build. O backend possui testes de integração em `backend/tests`. Antes de publicar, também é recomendável validar as regras de autorização por usuário, as variáveis de produção, as regras do Firebase e a conexão segura com o MongoDB.

## API

A documentação Swagger está disponível no backend em:

```text
http://localhost:3000/docs
```

Entre os endpoints disponíveis estão:

- `/user/auth`;
- `/account`;
- `/account/card`;
- `/account/transaction`;
- `/transaction`;
- `/account/:accountId/statement`.
