# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DT Money: a single-page personal finance app (Rocketseat course project) for recording income/outcome transactions, with a summary (income, outcome, total), search, type filter, sorting, and edit/delete. UI text is in Brazilian Portuguese; currency and dates are formatted as `pt-BR` / BRL (`src/utils/formatter.ts`).

## Stack

- React 18 + TypeScript 4, bundled with Vite 3
- styled-components 5 for styling, with a typed theme
- Radix UI (`react-dialog`, `react-radio-group`) for the modal and the income/outcome toggle
- react-hook-form + zod (`@hookform/resolvers/zod`) for forms
- `use-context-selector` for global state
- phosphor-react for icons
- json-server (dev dependency) plus axios. Both are legacy, see below.

## Commands

Both `yarn.lock` and `package-lock.json` are committed. The README uses `yarn`.

- `yarn dev`: start the Vite dev server
- `yarn build`: type-check with `tsc`, then `vite build`
- `yarn preview`: serve the production build
- `yarn lint` / `yarn lint:fix`: ESLint on `src` (`.ts`/`.tsx`)
- `yarn dev:server`: start json-server on `server.json` (port 3000, 500ms delay). The app does not currently need it.

There is no test framework set up.

`.eslintrc.json` extends `@rocketseat/eslint-config/react`, but that package is not in `package.json`. You must install it before `yarn lint` will work.

## Architecture

**Persistence is localStorage, not an API.** `src/services/transactionsStorage.ts` owns the `Transaction` type and reads and writes the key `@dt-money:transactions`. The app originally fetched from json-server through `src/services/api.ts` (axios, `http://localhost:3000`). Nothing imports that file now, and `server.json` only holds seed data from the old setup.

**All state lives in one context.** `src/contexts/Transactions/` is split into two files:
- `TransactionContext.tsx` creates the context with `use-context-selector`'s `createContext` and defines the shared types (`CreateTransactionData`, `TransactionTypeFilter`, `TransactionSortOrder`).
- `TransactionProvider.tsx` keeps the raw transaction list plus `query`, `typeFilter` and `sortOrder`. It derives the filtered and sorted list in a `useMemo` and exposes it as `transactions`. Any change to the list is written back to localStorage in a `useEffect`.

Things to know when working with this context:
- Consumers read single fields with `useContextSelector(TransactionsContext, ctx => ctx.x)`, not `useContext`. This avoids unnecessary re-renders, so keep using it.
- `transactions` in the context is the **filtered and sorted** list. `useSummary` (`src/hooks/useSummary.ts`) totals that list, so the summary cards follow the active search and filter.
- Payment status badges on outcomes come from `getPaymentOverview` (`src/utils/paymentStatus.ts`, via `usePaymentStatus`). It is derived from `allTransactions`, never the filtered list: all incomes pay outcomes oldest first. It is not persisted. Spec: `docs/specs/2026-11-23-status-pagamento-saidas.md`.
- `getTransactions(query)` only sets the search query. It is `async` and returns a Promise left over from the API version, as do `create`, `update` and `remove`.

**UI layout:** `App.tsx` wraps everything in `ThemeProvider` → `GlobalStyles` → `TransactionsContextProvider` → the single page `pages/Transactions`. Shared components live in `src/components/` and page-only components in `src/pages/Transactions/components/`. The Transactions page controls `NewTransactionModal`, a Radix Dialog used for both create and edit: it opens in edit mode when it receives a `transaction` prop.

## Conventions

- Each component folder has `index.tsx` plus `styles.ts`. Styles are imported as a namespace with a one-letter alias (`import * as S from './styles'`, also `T`, `N`, etc.).
- Use theme tokens through `props.theme['gray-800']`, etc. (`src/styles/themes/default.ts`). `src/@types/styled.d.ts` adds the theme's types to styled-components' `DefaultTheme`.
- Components are named exports (`export function X`).
- Form schemas are defined with zod next to the component, and the form type comes from `zod.infer`.
