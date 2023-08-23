<div align="center">
  <h1>⚙️ Next Demo</h1>
  <p>
    Demonstração de uso e notações utilizadas pelo Next 13 para pastas,
    arquivos e como impacta no roteamento.
  </p>
</div>

## 📑 Conteúdos

- [Rodando o projeto](#hammer_and_wrench-rodando-o-projeto)
- [Organizando a aplicação](#card_file_box-organizando-a-aplicação)
  - [Organização de arquivos](#organização-de-arquivos)
  - [Organização de pastas](#organização-de-pastas)
    - [Opções de organização de pastas](#opções-de-organização-de-pasta)
  - [Rotas Dinâmicas](#rotas-dinamicas)
  - [Rotas Paralelas](#rotas-paralelas)
- [Server Side Rendering](#satellite-server-side-rendering)
  - [Server Components _vs_ Client Components](#server-components-vs-client-components)
- [Data Fetching](#inbox_tray-data-fetching)
  - [Caching](#caching)
    - [Agora, como o Data Cache funciona?](#agora-como-o-data-cache-funciona)
  - [Revalidating](#revalidating)
  - [Busca de dados no cliente](#busca-de-dados-no-cliente)
  - [Busca de dados no servidor](#busca-de-dados-no-servidor)
    - [Route Handlers](#route-handlers)
    - [Convenção](#convenção)
    - [Exemplos de utilização](#exemplos-de-utilização)
- [Aprenda mais](#seedling-para-saber-mais)

## :hammer_and_wrench: Rodando o projeto

Após baixar o projeto:

```bash
# instale as dependências
npm i
# or
yarn
# or
pnpm i

# rode o projeto em dev mode
npm run dev
# or
yarn dev
# or
pnpm dev
```

## :card_file_box: Organizando a aplicação

O Next permite com que você siga sua própria organização de projeto,
porém, tomando cuidado com as notações utilizadas pelo framework para
mapear rotas através da **organização das pastas** no diretório
principal, o `app`, além de definir diferentes tipos de tela
baseando-se nos **nomes dos arquivos**.

### Organização de arquivos

O Next tem uma nomenclatura de nomes de arquivos de acordo com sua
utilidade, são elas:

| nome do arquivo                                                                                         | função                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`error`](https://nextjs.org/docs/app/api-reference/file-conventions/error)                             | define uma página de erro inesperado para uma determinada rota e seus filhos                                                                                                                                                  |
| [`layout`](https://nextjs.org/docs/app/api-reference/file-conventions/layout)                           | define uma página a ser compartilhada por mais de uma rota                                                                                                                                                                    |
| [`loading`](https://nextjs.org/docs/app/api-reference/file-conventions/loading)                         | define uma página de carregamento utilizando o [Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)                                                                             |
| [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)                     | define uma página de not found além do next retornar o erro 404                                                                                                                                                               |
| [`page`](https://nextjs.org/docs/app/api-reference/file-conventions/page)                               | define uma página única para uma rota                                                                                                                                                                                         |
| [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)                 | define as _requests_ externas de determinada rota, não podendo estar no mesmo nível de um arquivo `page`                                                                                                                      |
| [`template`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates) | são similares aos layouts no que se refere a envolver layouts ou pages, mas criam uma nova instância paga cada "filho", estados não são preservados e efeitos são ressincronizados. Por isso, são usados em casos específicos |

> ⚠️ As funções retornadas por essas páginas apenas devem ser feitas
> com `export default`, sem isso, a aplicação quebra. O mesmo que
> acontece o root `layout` e o root `page`.

### Organização de pastas

No diretório principal, podemos criar pastas que irão definir as rotas
da nossa aplicação, por exemplo:

<img src="./assets/routable-folders.png" alt="rotas roteáveis">

Observe que os nomes das pastas e como estão aninhadas definem os nomes
das rotas. Além disso, quando não informamos um arquivo `page` ou
`route`, a pasta não será roteada, pois apenas o conteúdo retornado por
um arquivo page ou route que será enviado para o _client_:

<img src="./assets/not-routable-folders.png" alt="rotas não roteáveis">

Isso significa que qualquer arquivo que não for nomeado como `page` ou
`route` não será roteável e se não for um arquivo com um dos nomes
especiais, também não irá ter uma finalidade determinada para o Next.

<div align="center">
  <img src="./assets/folders.png" alt="pastas">
</div>

#### Opções de organização de pasta

Como foi dito, se um arquivo não carrega nenhum dos nomes reservados
para uma determinada funcionalidade no Next, ele será apenas um arquivo,
mas o framwork oferece algumas opções de organização de pastas:

- **Pastas privadas:** são pastas que serão ignoradas pelo sistema de
  roteamento do Next e podem ser criadas colocando underline na frente
  do nome, como:

<img src="./assets/private-folders.png" alt="pastas privadas">

- **Grupos de rotas:** caso queira trazer uma organização além de
  separar as pastas por rotas, podemos fazer a separação por pastas que
  não serão adicionadas nas URLs geradas. Para isso, devemos colocar o
  nome da pasta entre parênteses:

<img src="./assets/route-groups.png" alt="grupo de rotas">

> ⚠️ Lembrando que essas convenções não são obrigatórias, mas podem
> ajudar na organização e não ficar dependendo de lembrar as notações
> nomeação reservadas para arquivos especiais do Next.

### Rotas Dinâmicas

Quando você não conhece os segmentos exatos de uma rota com antecedência
e deseja criar rotas a partir de dados dinâmicos, pode usar segmentos
dinâmicos que são preenchidos no momento da solicitação ou
pré-renderizados no momento do build da aplicação.

Uma rota dinâmica pode ser criada seguindo a notação: `[nome_da_pasta]`,
como `[id]`, `[slug]` etc. Esses segmentos são passados através da prop
`params` para as funções de `layout`, `page`, `route` e
`generateMetadata`.

Por exemplo, um blog poderia incluir a seguinte rota:
`app/blog/[slug]/page.tsx`, na qual _slug_ é o segmento dinâmico para
os posts do blog:

| Rota                      | URL       | params          |
| ------------------------- | --------- | --------------- |
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |

```tsx
interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>My Post: {params.slug}</div>;
}
```

### Rotas Paralelas

O roteamento paralelo permite que você, simultaneamente ou
condicionalmente, renderize uma ou mais páginas no mesmo `layout`.
Por exemplo, você pode renderizar, simultaneamente, as páginas de
`team` e `analytics`:

<div align="center">
  <img src="./assets/parallel-routing.png" alt="rotas paralelas">
</div>

Como observado, a notação para criar uma rota paralela é:
`@nome_da_pasta`. Além disso, essa estrutura de pastas permite com que
o componente em `layout.js` aceite `@team` e `@analytics` slot props e
possa renderizá-las em paralelo juntamente com a prop `children`:

```tsx
export default function Layout(props: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.team}
      {props.analytics}
    </>
  );
}
```

> 💡 Note que a prop `children` é um slot implícito que não precisa estar
> ligado a uma pasta. Isso significa que `app/page.js` é equivalente a
> `app/@children/page.js`.

Esse tipo de rota também permite com que possamos renderizar rotas
condicionalmente baseada em certas condições, como o estado de
autenticação do usuário:

<div align="center">
  <img src="./assets/conditional-parallel-route.png" alt="rotas paralela condicional">
</div>

## :satellite: Server Side Rendering

A ideia de renderizar uma aplicação do lado do seridor veio para ajudar
a resolver problemas antes enfrentados por _Single Page Applications_
(SPAs):

- Reduzindo javascript do lado do _browser_
- Gerando mais compatibilidade com dispositivos e _browsers_ diferentes
- Permitir várias otimizações, como fazer o cache de uma página,
  proporcionando um carregamento mais rápido, otimizar a renderização de
  imagens, recursos para SEO, além de recursos para _Edge computing_.

> A computação de borda (Edge computing) é um paradigma de computação
> distribuída que aproxima a computação e o armazenamento de dados das
> fontes de dados. Espera-se que isso melhore os tempos de resposta e
> economize largura de banda.

Por ter um lado servidor, é possível trabalhar com lógicas, como acesso
direto ao banco de dados e até criação de APIs Rest. E é muito utilizado
para ser um _Backend for Frontend_ (BFF), pois permite que as
necessidades do front sejam supridas pelo próprio back do Next.

### Server Components _vs_ Client Components

Os _Server Components_ são gerados totalmente pelo lado do servidor,
eles não têm nenhuma interatividade quando renderizado no navegador.

Já o _Client Component_, serve para suprir demandas que iremos precisar
de interatividade e manipular no navegador, como um componente de
vídeo, que irá ser pré-renderizado no servidor, mas terá uma parte
javascript que será rodada no navegador, ou seja, se for necessário
contato com APIs do navegador, então um _Client Component_ é ideal. As
vantagens:

- _bundle_ js menor
- carregamento inicial mais rápido
- cacheamento em nível de componente
- chamadas externas em paralelo

## :inbox_tray: Data Fetching

_Data fetching_ é uma parte essencial em qualquer aplicação, aqui será
mais explicado sobre fetch no servidor e fetch no client via
_Router Handler_. Mas antes disso, vamos ver sobre **cache** e
**revalidating**, que são conceitos essenciais para o entendimento do
fetch no server.

### Caching

Por padrão, qualquer requisição de dados já será cacheada pelo Next,
garantindo que não haja necessidade de fazer um fetch a cada nova
requisição, persistindo os dados no **Data Cache** embutido existente.

#### Agora, como o Data Cache funciona?

- A primeira vez que há uma requisição durante a renderização, o Next
  checa o _Data Cache_ para obter alguma resposta já cacheada;
- Se encontra ele retorna esse valor imediatamente e já
  **memoizado**.
- Caso não encontre, a requisição é feita e o resultado é guardado e
  memoizado nesse _Data Cache_.
- Para dados não cacheados, o resultado é sempre trazido do data source
  e ainda memoizado.

Observe que independente dos dado serem cacheados ou não, as
requisições sempre serão memoizadas para evitar requisições duplicadas
durante as renderizações.

### Revalidating

O cache de dados (_Data Cache_) persiste nas requisições e
deployments recebidos, a menos que você revalide ou recuse. Falando da
revalidação, ela pode ser feita de duas maneiras:

- **Baseada no tempo:** revalida os dados em intervalos de tempo
  pré-determinados. Isso é útil para dados que mudam com pouca
  frequência e a atualização não é tão crítica.

```js
// Revalida a cada uma hora
fetch("https://...", { next: { revalidate: 3600 } });
```

- **Por demanda:** revalida os dados por path ([revalidatePath](https://nextjs.org/docs/app/building-your-application/caching#revalidatepath))
  ou por cacheTag ([revalidateTag](https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttag-and-revalidatetag)).

E claro, para recusar o cache utilizando a opção:

```js
// Recusando o caching para uma requisição fetch individual
fetch(`https://...`, { cache: "no-store" });
```

### Busca de dados no cliente

Se você precisa fazer um fetch em um Client Component, há três
alternativas:

- Chamar um Route Handler. Eles são executados no servidor e retornam
  os dados para o cliente, sendo útil para quando você não quer expor
  informações sensíveis para o cliente como API tokens;
- Utilizar libs como [SWR](https://swr.vercel.app/) ou
  [React Query](https://tanstack.com/query/latest).

### Busca de dados no servidor

O Next estende a fetch API nativa para permitir o usuário configurar o
caching e revalidating para cada request no servidor. E o React estende
o fetch para memoizar as requests automaticamente enquanto renderiza
componentes react.

Pode-se usar o fetch com async/await em Server Components diretamente,
mas é recomendado a utilização de Route Handlers ou Server Actions.
Aqui o foco será os Route Handlers.

```jsx
async function getData() {
  const res = await fetch("https://api.example.com/...");
  // O valor retornado não é serializado, você pode
  // retornar um Date, Map, Set etc.

  if (!res.ok) {
    // Isso vai ativar o `error.js` Error Boundary
    // mais próximo
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

**⚠️ Bom saber:**

- Em Route Handlers, as requisições não são memoizdas, já que esses
  handlers não fazem parte dos componentes react;
- Para usar async/await em Server Components com TypeScript, é
  necessário utilizar o ts `5.1.3` ou maior e `@types/react` `18.2.8` ou
  maior.

#### Route Handlers

Esses arquivos permitem você criar manipuladores de requisições
customizados para uma dada rota, usando as APIs Web [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
e [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

<div align="center">
  <img src="./assets/route-handler.png" alt="Route handler">
</div>

> Route Handlers só são disponíveis dentro da pasta `app`. Eles são
> equivalentes às [`API Routes`](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
> dentro de `pages`, então é necessário utilizar os dois juntos.

#### Convenção

Route Handlers são definidos em um arquivo `route.js|ts` dentro da
pasta `app`:

```tsx
export async function GET(request: Request) {}
```

Eles podem ser organizados de forma similar aos arquivos de `page.ts`
e `layout.ts`, mas não pode ter um arquivo `route.ts` no mesmo nível
que uma `page`.

Já os métodos suportados são: `GET`, `POST`, `PUT`, `PATCH`,
`DELETE`, `HEAD` e `OPTIONS`. Além disso, as Requests e Responses
nativas são estendidas pelo Next por [NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request)
e [NextResponse](https://nextjs.org/docs/app/api-reference/functions/next-response)
para prover helpers para casos de uso avançados.

#### Exemplos de utilização

- **CORS**

```tsx
export async function GET(request: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
```

- **GET**

```tsx
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });

  const product = await res.json();

  return NextResponse.json({ product });
}
```

- **POST**

```tsx
import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
```

- **Cookies**

```tsx
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token.value}` },
  });
}
```

- **Headers**

```tsx
import { headers } from "next/headers";

export async function GET(request: Request) {
  const headersList = headers();
  const referer = headersList.get("referer");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { referer: referer },
  });
}
```

- **Redirects**

```tsx
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  redirect("https://nextjs.org/");
}
```

- **Rotas dinâmicas**

```tsx
interface DynamicParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: DynamicParams) {
  const slug = params.slug; // 'a', 'b', or 'c'
}
```

<p align="center">
  <strong></strong> 🚧 Readme em construção 👷‍♀️
</p>

## :seedling: Para saber mais

- [A documentação do Next.js](https://nextjs.org/docs) - aprenda sobre
  as features do Next.js e API
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial Next
  interativo
- [Rotas dinâmicas](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params) - mais detalhes sobre a criação de rotas dinâmicas com Next
- [Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns) - patterns e boas práticas recomendadas para buscar dados no Next e React

<hr>

<p align="center">
  Feito com 🤍 por
  <a href="https://www.linkedin.com/in/ana-beatriz-nunes/">
    Ana Beatriz Nunes
  </a>
</p>
