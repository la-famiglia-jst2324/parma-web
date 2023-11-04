# parma-web

ParmaAI webstack including frontend and REST API backend.

## Getting Started

The following steps will get you started with the project.

1. **Pre-requisites**: to be able to contribute to JST in this repository, make sure to comply with the following prerequisites.

   - Configure GitHub via an ssh key. Key based authenticated is highly encouraged. See [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for more information.
   - Please make sure to have an GPG key configured for GitHub. See [GitHub Docs](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) for more information.
   - Install node `v20` via node version manager (`nvm`) to not cause conflicts with other projects of yours.

2. **Clone the repository**

   ```bash
   git clone git@github.com:la-famiglia-jst2324/parma-web.git
   ```

3. **Precommit & pnpm setup**:

   ```bash
   make install
   ```

4. **Start the development server**

   ```bash
   make dev
   ```

   **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

5. Optional: Running parts of the pre-commit pipeline manually

   ```bash
   make lint  # runs linting
   make build  # builds the project
   ```

6. Optional: Run a production build (used in the CI pipeline)

   ```bash
   make start
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure

The following directory structure is used in this project:

```bash
.
├── node_modules: temporary directory for node dependencies
├── public
│   ├── next.svg
│   └── vercel.svg
├── src: Source code directory for both backend and frontend
│   ├── api: Backend API
│   ├── app: Frontend app
│   ├── components: Reusable components
│   └── types: Typescript types
├── tests: Tests directory
├── Makefile: Recipes for easy simplified setup and local development
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

Core libraries that this project uses:

- [zod](https://www.npmjs.com/package/zod): User input validation and validation schemas
- [jest](https://www.npmjs.com/package/jest): Unit testing (alternatively: [vitest](https://www.npmjs.com/package/vitest))
- [pino](https://www.npmjs.com/package/pino): low overhead logging
- integration and regression testing: a subset of [cypress](https://www.npmjs.com/package/cypress), [puppeteer](https://www.npmjs.com/package/puppeteer)
- if next-fetch is not enough: [axios](https://www.npmjs.com/package/axios)
- if we need a dedicated auth library: [next-auth](https://www.npmjs.com/package/next-auth) or [passport](https://www.npmjs.com/package/passport)

## Remarks

### Google Fonts

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Disclaimer

In case there are any issues with the initial setup or important architectural decisions/integrations missing, please contact the meta team or @robinholzi directly.
