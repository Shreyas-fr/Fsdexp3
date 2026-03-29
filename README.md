# React + TypeScript + Vite

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
    # EcoSage

    EcoSage — AI Sustainability Companion.

    This repository contains a Vite + React + TypeScript frontend used to scan products and estimate environmental impact. The app includes features such as a product scanner, alternatives suggestions, a calculator, recycling map, and a user journey tracker.

    ## Features

    - Scanner — search or scan products to get sustainability information
    - Alternatives — recommendations for greener products
    - Calculator — simple footprint calculations
    - Map — recycling locations and resources
    - Journey — track past scans and progress

    ## Quick start (local)

    Prerequisites: Node.js 18+ and npm (or yarn/pnpm)

    1. Install dependencies

    ```bash
    npm install
    ```

    2. Run development server

    ```bash
    npm run dev
    ```

    Open http://localhost:5173 (Vite default) in your browser.

    3. Build for production

    ```bash
    npm run build
    npm run preview
    ```

    ## Scripts

    - `npm run dev` — start dev server with HMR
    - `npm run build` — create a production build
    - `npm run preview` — locally preview the production build
    - `npm run lint` — run linter (if configured)

    If any of the scripts above are missing, check `package.json` for exact script names.

    ## Development notes

    - Uses Vite with React + TypeScript
    - ESLint configuration is present in `eslint.config.js` — you can expand it for type-aware rules if needed

    ## Contributing

    1. Fork the repo
    2. Create a feature branch: `git checkout -b feat/your-feature`
    3. Commit your changes and push: `git push origin feat/your-feature`
    4. Open a pull request

    Please keep changes small and focused. Add tests or manual verification steps when appropriate.

    ## License

    This project does not include a LICENSE file yet. If you want to apply the MIT license, create a `LICENSE` file with the MIT text. I can add one for you if you like.

    ## Repository

    https://github.com/Shreyas-fr/Fsdexp3

    ---

    If you'd like, I can also add a `LICENSE` (MIT), improve the README with screenshots, or add a simple GitHub Actions workflow for CI.
