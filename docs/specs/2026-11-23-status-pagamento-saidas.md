# Spec: status de pagamento das saídas

- **Data:** 2026-11-23
- **Status:** implementada
- **Autor:** Ronald Tomaz

## 1. Objetivo

Cada saída (`type: "outcome"`) da tabela de transações mostra um badge que diz se ela já está paga **pelo saldo geral acumulado de todos os meses**. Assim o usuário vê com clareza o que ainda está descoberto.

Hoje o app mostra só o total (`Summary`) e o saldo por mês (`MonthlyComparison`). Um total negativo diz que falta dinheiro, mas não diz **quais** gastos estão descobertos. Esta feature responde a essa pergunta item por item.

## 2. Regra de negócio

### 2.1 Modelo: as entradas pagam as saídas mais antigas primeiro (FIFO)

1. Somar **todas** as entradas de todos os meses. Esse é o "caixa" disponível.
2. Ordenar **todas** as saídas da mais antiga para a mais recente (`created_at` crescente; em empate, `id` crescente).
3. Percorrer as saídas em ordem e descontar cada uma do caixa:
   - se o caixa cobre o valor inteiro, a saída fica **Paga**;
   - se o caixa cobre só uma parte, ela fica **Parcial**, e guardamos quanto falta;
   - se o caixa já está zerado, ela fica **Em aberto**.

Consequências práticas:

- Se o saldo geral (`entradas − saídas`) for `≥ 0`, **todas** as saídas ficam Pagas.
- Se o saldo geral for `−X`, as saídas **mais recentes** que somam `X` ficam Em aberto (e no máximo uma fica Parcial, na fronteira). O valor em aberto somado é sempre igual a `X`.
- Uma entrada nova paga primeiro a saída em aberto mais antiga. Quando o usuário recebe, os badges mudam de "Em aberto" para "Pago" de cima para baixo na linha do tempo.

### 2.2 Por que um caixa global, sem simular mês a mês

Existe uma alternativa mais "realista": simular cronologicamente, com cada entrada abatendo dívidas pendentes e cada saída consumindo o caixa daquele momento. **O resultado é idêntico** ao do modelo global:

- nos dois casos o total pago é `min(entradas, saídas)`;
- nos dois casos as saídas não pagas formam um sufixo (as mais recentes). Uma saída nova só é paga se houver caixa sobrando, e só sobra caixa depois que todas as dívidas anteriores foram quitadas.

Por isso usamos a versão global. É mais simples, `O(n log n)`, e não depende de datas de entrada.

### 2.3 Decisões

| Questão | Decisão |
|---|---|
| Base do cálculo | `allTransactions` (lista crua). **Nunca** a lista filtrada `transactions`. Busca, filtro de tipo e ordenação não podem alterar o status. |
| Entradas | Não recebem badge. |
| Saída de valor 0 | Paga. |
| Precisão | Cálculo em **centavos inteiros** (`Math.round(price * 100)`) para evitar erro de ponto flutuante (ex.: `0.1 + 0.2`). |
| Categoria | Ignorada. Toda entrada conta como caixa, inclusive "Investimento". |
| Mês selecionado (`MonthSelector`) | Ignorado. O status é sempre global, como pedido. |
| Datas futuras | Hoje não existem (`created_at` é sempre "agora" e não é editável). Se um dia existirem, entram na ordenação normalmente. |

## 3. Design técnico

### 3.1 Função pura: `src/utils/paymentStatus.ts` (novo)

Segue o padrão de `src/utils/monthlyMetrics.ts`: lógica pura, sem React.

```ts
import { Transaction } from "../services/transactionsStorage";

export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface OutcomePayment {
  status: PaymentStatus;
  // Quanto da saída ainda não foi coberto pelo saldo, em reais
  remaining: number;
}

export interface PaymentOverview {
  byId: Map<number, OutcomePayment>;
  // Soma do que está em aberto (= max(saídas − entradas, 0))
  unpaidTotal: number;
  unpaidCount: number;
  outcomeCount: number;
}

const toCents = (value: number) => Math.round(value * 100);

// As entradas de todos os meses pagam as saídas da mais antiga para a mais recente
export function getPaymentOverview(transactions: Transaction[]): PaymentOverview {
  let available = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + toCents(transaction.price), 0);

  const outcomes = transactions
    .filter((transaction) => transaction.type === "outcome")
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime() ||
        a.id - b.id
    );

  const byId = new Map<number, OutcomePayment>();
  let unpaidCents = 0;
  let unpaidCount = 0;

  outcomes.forEach((outcome) => {
    const price = toCents(outcome.price);
    const covered = Math.min(available, price);
    const remaining = price - covered;

    available -= covered;

    const status: PaymentStatus =
      remaining === 0 ? "paid" : covered > 0 ? "partial" : "unpaid";

    if (remaining > 0) {
      unpaidCents += remaining;
      unpaidCount += 1;
    }

    byId.set(outcome.id, { status, remaining: remaining / 100 });
  });

  return {
    byId,
    unpaidTotal: unpaidCents / 100,
    unpaidCount,
    outcomeCount: outcomes.length,
  };
}
```

Observação: `filter` cria um array novo, então o `sort` não muta o estado do contexto.

### 3.2 Hook: `src/hooks/usePaymentStatus.ts` (novo)

Segue `useMonthlyMetrics`: lê `allTransactions` com `useContextSelector` e memoiza.

```ts
export function usePaymentStatus() {
  const allTransactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.allTransactions
  );

  return useMemo(() => getPaymentOverview(allTransactions), [allTransactions]);
}
```

Nenhuma mudança no `TransactionsContext` nem no localStorage. O status é **derivado** e não é persistido, então não precisa de migração.

### 3.3 Componente: `src/components/PaymentBadge/` (novo)

`index.tsx` + `styles.ts`, com `import * as P from './styles'`.

```tsx
interface PaymentBadgeProps {
  payment: OutcomePayment;
}

export function PaymentBadge({ payment }: PaymentBadgeProps) { ... }
```

| Status | Texto | Ícone (phosphor-react) | Cor | `title` (tooltip) |
|---|---|---|---|---|
| `paid` | Pago | `CheckCircle` | `green-300` | "Coberto pelo saldo geral" |
| `partial` | Parcial | `CircleHalf` | `yellow-300` | "Faltam R$ X para cobrir" |
| `unpaid` | Em aberto | `WarningCircle` | `red-300` | "Faltam R$ X para cobrir" |

Visual: pill com `border-radius: 999px`, `padding: 0.125rem 0.5rem`, `font-size: 0.75rem`, `font-weight: bold`. O fundo é a cor com transparência (`${theme[color]}26`, cerca de 15%) e o texto e o ícone ficam na cor cheia, para combinar com o `gray-700` da linha.

Acessibilidade: o texto do badge é sempre visível, sem depender só da cor. O valor restante também vai em `aria-label` além do `title`.

### 3.4 Tema: `src/styles/themes/default.ts`

O tema não tem cor de alerta. Adicionar, da paleta Rocketseat:

```ts
'yellow-300': '#FBA94C',
'yellow-500': '#E0882F',
```

Não precisa mexer em `styled.d.ts`, que já infere o tipo do tema.

### 3.5 Tabela: `src/pages/Transactions/index.tsx`

- Chamar `const { byId } = usePaymentStatus()`.
- Na célula de preço, ao lado do `PriceHighlight`, renderizar `<PaymentBadge payment={byId.get(transaction.id)} />` só quando `transaction.type === "outcome"` e houver entrada no mapa.
- Envolver preço + badge num container flex (`T.PriceCell`: `display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap`). Em telas `≤ 768px`, o badge quebra para baixo do valor.

Por que na célula de preço e não numa coluna nova: a tabela não tem `<thead>`, já tem cinco colunas e precisa caber no mobile. O badge descreve o valor, então fica junto dele.

### 3.6 Resumo do que está em aberto (incluído no escopo)

Sem um total, o usuário precisa somar os badges de cabeça. Mostrar uma linha discreta acima da tabela, dentro de `T.FiltersBar` ou logo abaixo dela:

- `unpaidCount > 0`: "**N saídas em aberto**, faltam R$ X para cobrir" (em `red-300`).
- `unpaidCount === 0` e existe ao menos uma saída: "Todas as saídas estão cobertas pelo saldo" (em `green-300`).
- Sem saídas (`outcomeCount === 0`): não renderiza nada.

Componente `src/pages/Transactions/components/PaymentOverview/` (`index.tsx` + `styles.ts`). Os valores vêm do mesmo hook, sem recalcular.

## 4. Plano de implementação

Cada passo vale um commit pequeno, no padrão do repo (`feat:`, `style:` etc.).

1. **Tema:** adicionar `yellow-300` e `yellow-500` em `default.ts`.
2. **Lógica:** criar `src/utils/paymentStatus.ts` com `getPaymentOverview` e os tipos.
3. **Hook:** criar `src/hooks/usePaymentStatus.ts`.
4. **Badge:** criar `src/components/PaymentBadge/` (`index.tsx`, `styles.ts`).
5. **Tabela:** adicionar `T.PriceCell` em `src/pages/Transactions/styles.ts` e renderizar o badge nas saídas em `index.tsx`.
6. **Resumo:** criar `PaymentOverview` e posicionar acima da tabela.
7. **Verificação:** `yarn build` sem erros de tipo e o roteiro manual da seção 5. `yarn lint` exige instalar `@rocketseat/eslint-config` antes (ver CLAUDE.md).
8. **Docs:** acrescentar no CLAUDE.md (seção Architecture) uma linha dizendo que o status de pagamento é derivado de `allTransactions` em `utils/paymentStatus.ts`.

Estimativa: 1h a 2h.

## 5. Critérios de aceite e roteiro de teste manual

O projeto não tem framework de testes, então a validação é manual. Para montar cada cenário, limpe `@dt-money:transactions` no DevTools (Application → Local Storage) e crie as transações na ordem indicada.

| # | Cenário (em ordem de criação) | Esperado |
|---|---|---|
| 1 | Entrada 1000 · Saída 300 · Saída 200 | As duas saídas Pagas. Resumo: "Todas as saídas estão cobertas". |
| 2 | Entrada 500 · Saída 300 · Saída 400 | Saída 300 Paga. Saída 400 **Parcial**, faltam R$ 200,00. Resumo: 1 em aberto, R$ 200,00. |
| 3 | Cenário 2 + Saída 100 | A 400 continua Parcial (faltam 200) e a 100 fica **Em aberto**. Resumo: 2 em aberto, R$ 300,00. |
| 4 | Cenário 3 + Entrada 250 | A 400 vira Paga e a 100 fica Parcial (faltam R$ 50,00). As entradas novas pagam a dívida mais antiga primeiro. |
| 5 | Só Saída 100 | Em aberto, faltam R$ 100,00. |
| 6 | Cenário 2, depois buscar "xyz" ou filtrar por "Saída" | Os badges das linhas visíveis **não mudam**. O resumo de em aberto também não muda. |
| 7 | Cenário 2, ordenar por "Maior valor" | Os status continuam os mesmos, só a ordem das linhas muda. |
| 8 | Cenário 2, editar a Saída 400 para 200 | Ela vira Paga na hora. |
| 9 | Cenário 2, excluir a Entrada 500 | As duas saídas ficam Em aberto. |
| 10 | Cenário 2, editar a Saída 300 para Entrada | Caixa 800 contra a Saída 400: Paga. A linha editada perde o badge. |
| 11 | Entrada 0,30 · Saída 0,10 · Saída 0,20 | As duas Pagas (nada de "Parcial" por erro de ponto flutuante). |
| 12 | Recarregar a página após qualquer cenário | Mesmos status (derivados do localStorage). |
| 13 | Largura de 375px | O badge quebra para baixo do valor sem scroll horizontal. |

Critérios gerais:

- Entradas nunca exibem badge.
- A soma dos "faltam" de todas as saídas é igual a `max(saídas − entradas, 0)` e ao valor mostrado no resumo.
- Nenhuma mudança no formato salvo no localStorage.

## 6. Fora do escopo (próximos passos possíveis)

- **Filtro "Em aberto"** no `TypeFilter` ou como toggle próprio. Exigiria que o provider conhecesse o status, ou um filtro aplicado na página depois de `transactions`.
- **Pagamento manual:** marcar uma saída como paga independentemente do saldo, o que exigiria um campo novo persistido e uma migração.
- **Saldo por mês:** um badge que considere só o mês da saída. O pedido foi explicitamente o saldo geral.
- **Prioridade de pagamento por categoria** (ex.: Moradia antes de Alimentação), no lugar da ordem cronológica.
- **Testes automatizados:** `getPaymentOverview` é pura e seria o primeiro alvo natural se o projeto adotar Vitest. Os cenários da seção 5 viram casos de teste diretamente.
