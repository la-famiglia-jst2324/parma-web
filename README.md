# parma-web

[![Chore](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml)
[![CI](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml)
[![Deploy](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml/badge.svg)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml)
[![Major Tag](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml/badge.svg)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml)
![Functions](https://img.shields.io/badge/functions-66.66%25-red.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-53.09%25-red.svg?style=flat)

ParmaAI webstack including frontend and REST API backend.

![Screenshot](./docs/images/landing_page.png)

## Getting Started

The following steps will get you started with the project.

1. **Pre-requisites**: to be able to contribute to JST in this repository, make sure to comply with the following prerequisites.

   - Configure GitHub via an ssh key. Key based authenticated is highly encouraged. See [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for more information.
   - Please make sure to have an GPG key configured for GitHub. See [GitHub Docs](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) for more information.
   - Install node `v18` via node version manager (`nvm`) to not cause conflicts with other projects of yours.
   - Make sure you have [pnpm](https://pnpm.io/installation) installed.
   - (Windows Users Only) have WSL installed on your system and use a linux distribution such as Ubuntu

2. **Clone the repository**

   (Windows Users) : Make sure to clone the repository on remote WSL!!

   ```bash
   git clone git@github.com:la-famiglia-jst2324/parma-web.git
   ```

3. **Precommit & pnpm setup**:

   ```bash
   make install
   ```

   **Skip to 4. if everything worked**

   In case you encounter errors while installing **_pre-commit_**, do _one_ of the following :

   1. Install pre-commit with sudo:

      ```bash
      sudo apt install pre-commit
      pre-commit # check that it has been correctly installed
      ```

   2. Install pre-commit using conda

      ```bash
      "${SHELL}" <(curl -L micro.mamba.pm/install.sh)
      bash
      micromamba activate
      micromamba install pre-commit
      pre-commit # check that it has been correctly installed
      ```

   3. Mac Users: consider using `brew install pre-commit`

   _Rerun the command to make sure there are no errors :_

   ```bash
   make install
   ```

4. **Setup Firebase Admin SDK**:

   The Firebase Admin SDK is used to verify user tokens in the backend (Next API routes).
   Please download [this secrest json file](https://www.notion.so/firebase-admin-sdk-certificate-4279aa3b4e904e1b927619ed69537045) from Notion and place it in `/src/api/.secrets/la-famiglia-parma-ai-firebase-adminsdk.json`.

5. **Start the development server**

   ```bash
   make dev
   ```

   **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

6. Optional: Running parts of the pre-commit pipeline manually

   ```bash
   make lint  # runs linting
   make build  # builds the project
   ```

7. Test your code and code coverage:

   As the tests require a postgres database to be running, you need a postgres database running locally.
   For that you can use the docker-compose file in the root directory of this project.

   ```bash
   docker compose up -d
   ```

   then before actually running the tests you must set the environment variable with the database credentials.
   Consider using `.env` files for that.

   ```bash
   export NEXT_PUBLIC_ENV="staging"
   export POSTGRES_HOST=localhost
   export POSTGRES_PORT=9000
   export POSTGRES_USER=parma-prod-db
   export POSTGRES_PASSWORD=parma-prod-db
   export POSTGRES_DB=parma-prod-db
   ```

   ```bash
   make test  # runs jest and typescript-coverage-report
   ```

8. Optional: Run a production build (used in the CI pipeline)

   ```bash
   make start
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

Follow the steps below to update your local database with recent changes

1.  Make sure your .env file contains:
    `POSTGRES_URL="postgresql://parma-prod-db:parma-prod-db@localhost:9000/parma-prod-db"
`
2.  To apply the recent changes to your local database, run:

    ```
    pnpm prisma migrate dev
    ```

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
   (breaking changes yield new major versions, new features yield new minor versions).

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
│   ├── contexts: Frontend context providers
│   ├── lib: generic / non ui functions
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
