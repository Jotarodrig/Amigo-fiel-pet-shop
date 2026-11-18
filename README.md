<<<<<<< HEAD
# 🐾 Amigo Fiel Pet Shop

Aplicação web de um pet shop fictício, desenvolvida como **Trabalho Final de Front-end Frameworks (AV2)** do curso de Ciência da Computação.

- **Tecnologias:** React 19 + TypeScript + Vite + React Router
- **Tema:** loja de produtos para cães e gatos, com catálogo, carrinho, login simulado, galeria de raças e formulário de contato.
- **APIs integradas (pontos extras):** [Dog CEO](https://dog.ceo/dog-api/), [The Cat API](https://thecatapi.com/) e [ViaCEP](https://viacep.com.br).

> **Deploy (opcional):** _cole aqui o link da Vercel/Netlify, se publicarem._

---

## 👥 Integrantes e componentes desenvolvidos

> **Preencham os nomes.** Cada integrante é responsável por criar e explicar **2 componentes** (arquivos em `src/components/`).
> Se o grupo tiver menos de 5 pessoas, redistribuam os componentes mantendo no mínimo 8 no projeto.

| Integrante | Componente 1 | Componente 2 |
|---|---|---|
| _João Pedro_ | `Navbar` | `Footer` |
| _José Wilson_ | `Hero` | `ProductCard` |
| _Luiz Gustavo_ | `BreedCard` | `CartItem` |
| _Enzo Veras_ | `LoginForm` | `ContactForm` |

Componentes de apoio (usados por todos): `Loading`, `ErrorMessage`, `DogDoDia` e `AddressFields`.
**Total: 14 componentes funcionais** (mínimo exigido: 8).

---

## ✅ Requisitos do trabalho

| Requisito | Mínimo | Neste projeto |
|---|---|---|
| Componentes funcionais | 8 | **14** (`src/components/`) |
| Páginas distintas | 5 | **6** + página 404 (`src/pages/`): Home, Produtos, Raças, Carrinho, Login, Contato |
| Hooks diferentes | 4 | **6 nativos + 2 customizados** (tabela abaixo) |
| TypeScript | obrigatório | 100% `.ts`/`.tsx`, com tipos em `src/types/` |
| Backend/API (extra) | opcional | **3 APIs reais** (Dog CEO, The Cat API, ViaCEP) |

### Hooks utilizados

| Hook | Onde é usado | Para quê |
|---|---|---|
| `useState` | `Produtos`, `Navbar`, `LoginForm`, `ContactForm`… | Filtros, menu aberto, campos de formulário |
| `useEffect` | `useFetch`, `useLocalStorage`, `LoginForm` | Chamar APIs, salvar no localStorage, focar campo |
| `useContext` | `CartContext`, `AuthContext` (via `useCarrinho`/`useAuth`) | Compartilhar carrinho e usuário logado |
| `useRef` | `SearchBar`, `AddressFields`, `LoginForm` | Focar campos de forma imperativa |
| `useMemo` | `Produtos`, `Racas`, `CartContext` | Evitar recalcular filtros e totais |
| `useCallback` | `CartContext` | Manter estáveis as funções do contexto |
| `useFetch` _(custom)_ | `DogDoDia`, `Racas` | Controlar carregando/erro/dados de uma API |
| `useLocalStorage` _(custom)_ | `CartContext`, `AuthContext` | Persistir carrinho e login ao recarregar |

Também são usados `useNavigate` (React Router) em `LoginForm` e `Carrinho`.

---

## 🚀 Instalação e uso

**Pré-requisito:** [Node.js](https://nodejs.org) 20 ou superior.

```bash
# 1. Clonar o repositório
git clone <URL-DO-REPOSITORIO>
cd petshop

# 2. Instalar as dependências
npm install

# 3. (Opcional) Configurar a chave da The Cat API
cp .env.example .env
# edite o arquivo .env e preencha VITE_CAT_API_KEY

# 4. Rodar em modo de desenvolvimento
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

### Chave da The Cat API (opcional)

As raças de **cães** (Dog CEO) e a busca de **CEP** (ViaCEP) funcionam sem chave.
Para listar as raças de **gatos**, a The Cat API pode exigir uma chave gratuita:

1. Cadastre-se em <https://thecatapi.com/signup> (a chave chega por e-mail).
2. Coloque-a no arquivo `.env`: `VITE_CAT_API_KEY=sua_chave`.
3. Reinicie o `npm run dev`.

Sem a chave, o app continua funcionando e mostra uma mensagem de erro amigável na aba "Gatos".

### Outros comandos

| Comando | O que faz |
|---|---|
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão de produção localmente |
| `npm run lint` | Analisa o código com o oxlint |
| `npm test` | Roda os testes automatizados (Vitest) |

---

## 🗺️ Páginas

| Rota | Página | O que tem |
|---|---|---|
| `/` | Home | Banner, produtos em destaque e foto aleatória de cachorro (Dog CEO) |
| `/produtos` | Produtos | Busca, filtro por categoria e por animal (dados estáticos) |
| `/racas` | Raças | Galeria de raças de cães e gatos (APIs Dog CEO e The Cat API) |
| `/carrinho` | Carrinho | Itens, quantidades, total e finalização (exige login) |
| `/login` | Login | Formulário com validação (login simulado) |
| `/contato` | Contato | Formulário com endereço autopreenchido pelo CEP (ViaCEP) |

---

## 🗂️ Estrutura do projeto

```
src/
├── components/   # 14 componentes funcionais reutilizáveis
├── pages/        # páginas ligadas às rotas
├── context/      # CartContext e AuthContext (useContext)
├── hooks/        # useFetch e useLocalStorage (custom hooks)
├── services/     # chamadas às APIs (Dog CEO, Cat API, ViaCEP)
├── data/         # catálogo estático de produtos
├── types/        # interfaces e tipos TypeScript
├── utils/        # funções auxiliares (formatar moeda, CEP)
├── test/         # configuração dos testes
├── App.tsx       # provedores + rotas
└── main.tsx      # ponto de entrada
```

---

## 📸 Telas principais

> **Adicionem os prints** na pasta `docs/` com os nomes abaixo (ou ajustem os caminhos).

| Home | Produtos |
|---|---|
| ![Home](docs/home.png) | ![Produtos](docs/produtos.png) |

| Raças | Carrinho |
|---|---|
| ![Raças](docs/racas.png) | ![Carrinho](docs/carrinho.png) |

| Login | Contato |
|---|---|
| ![Login](docs/login.png) | ![Contato](docs/contato.png) |

---

## ℹ️ Observações

- O **login e o envio do formulário de contato são simulados** (não há backend). Os dados de login e do carrinho ficam apenas no `localStorage` do navegador.
- Os **produtos são dados estáticos** em `src/data/produtos.ts`, pois nenhuma API pública oferece catálogo de pet shop.
- A loja, o nome e o e-mail de contato são fictícios.
=======
# Amigo-fiel-pet-shop
>>>>>>> a3c830117cc963fffab0c98e7c76fce69b459554
