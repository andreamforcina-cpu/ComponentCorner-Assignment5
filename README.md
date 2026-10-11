# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Assignment 5: Testing and Deployment

This version uses Vitest with React Testing Library and jsdom.

```bash
npm ci
npm test
npm run test:run
npm run build
```

`npm test` watches for changes; `npm run test:run` runs the complete suite once.

The four test files cover HomePage content and navigation, ProductCard props
and add callbacks, CartItem name/quantity and remove callbacks, and App cart
state, mocked localStorage loading/saving, repeated items, restoration after
reopening, storage failures, invalid saved data, and product detail routes.
The cart stores one entry per unit; each cart row therefore displays quantity 1.

### Vercel

Import the Assignment 5 repository in Vercel. Select the Vite framework preset,
use the repository root as the root directory, `npm run build` as the build
command, and `dist` as the output directory. No environment variables are needed.
`vercel.json` supports refreshing direct routes such as `/cart` and `/products/1`.

After deployment, verify Home, Products, product details, adding the same item
twice, totals, removing one item, and cart persistence after refreshing. Open
`/cart` and `/products/1` directly to confirm routing works in production.

Submit the new repository URL and the verified production Vercel URL.
