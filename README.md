# parma-web

[![Chore](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml)
[![CI](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml)
[![Deploy](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml/badge.svg)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml)
[![Major Tag](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml/badge.svg)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml)

ParmaAI webstack including frontend and REST API backend.

## Getting Started

The following steps will get you started with the project.

1. **Pre-requisites**: to be able to contribute to JST in this repository, make sure to comply with the following prerequisites.

   - Configure GitHub via an ssh key. Key based authenticated is highly encouraged. See [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for more information.
   - Please make sure to have an GPG key configured for GitHub. See [GitHub Docs](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) for more information.
   - Install node `v18` via node version manager (`nvm`) to not cause conflicts with other projects of yours.

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

## PR workflow

1. **Create a new branch**
   [linear.app](linear.app) offers a button to copy branch names from tickets.
   In case there is no ticket, please use feel free to use an arbitrary name or create a ticket.
   GitHub CI doesn't care about the branch name, only the PR title matters.

   ```bash
   # format: e.g. robinholzingr/meta-1-create-archtecture-drafts-diagrams-list-of-key-priorities
   git checkout -b <branch-name>
   ```

2. Open a PR and use a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) PR title.

3. Wait for CI pipeline to pass and if you are happy with your changes request a review.

4. Merge the PR (using the "Squash and merge" option) and delete the branch.
   Pay attention to include co-authors if anyone else contributed to the PR.

5. If you want to release a new version to production, create a new release on GitHub.
   The release version will be automatically derived from the PR titles
   (breaking changes yield new major versions, new features yield new minor versionss).

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

## Deployment

This project is deployed on [Vercel](https://vercel.com/) in @robinholzi's peronsal account.
As the hobby (free) plan enough for now, we will stick to it for the time being.

Every commit to a PR branch will trigger a deployment preview.
Every new version released on GitHub will trigger a production deployment.

In the future we might add a staging deployment that is deployed to on commit to the `main` branch.
Reach out to @robinholzi if you can benefit from this.

Maybe it would make sense to create a dedicated la-famiglia mail box to which
at least the meta team has access to.

We might switch to something else after choosing a full-stack framework like `Firebase`, `Supabase` or `AWS Amplify`.

## Remarks

### Google Fonts

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Disclaimer

In case there are any issues with the initial setup or important architectural decisions/integrations missing, please contact the meta team or @robinholzi directly.
