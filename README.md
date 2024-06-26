# parma-web

[![Chore](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/chore.yml)
[![CI](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/ci.yml)
[![Deploy](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml/badge.svg?event=release)](https://parma.software)
[![Deploy](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/release.yml/badge.svg?event=push)](https://staging.parma.software)
[![Major Tag](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml/badge.svg)](https://github.com/la-famiglia-jst2324/parma-web/actions/workflows/tag-major.yml)

![Functions](https://img.shields.io/badge/functions-57.11%25-red.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-55.64%25-red.svg?style=flat)

Frontend for the ParmaAI data mining and analytics platform.

![Topic listing](.github/screenshots/company/company_dashboard.png).

## Project Description

ParmaAI is a sophisticated platform combining advanced data mining with comprehensive analytics. At its core, Parma Analytics orchestrates the data lifecycle, scheduling and managing data mining modules, and processing the extracted data using tools like ChatGPT for in-depth analysis and report generation. Complementing this, Parma Web provides a user-friendly interface for data management and visualization, making the system's complex functionalities accessible and intuitive. Together, they form a powerful solution for businesses to monitor, analyze, and respond to corporate anomalies, leveraging data-driven insights for strategic decision-making.

### parma-web

Parma Web is the interactive user interface of the ParmaAI platform, designed for efficient data source management and visualization. It not only serves as a gateway for users to add, edit, and delete data sources but also ensures that these sources are seamlessly integrated into the platform once they are independently deployed. The repository is crucial for enhancing the user experience, providing clear visualization of analytics results, and facilitating interaction with the backend analytics system. Ideal for contributors focusing on front-end development, Parma Web combines usability and functionality, making complex data insights accessible and understandable for all users.

**Related repositories:**

- Core Backend: [parma-analytics](https://github.com/la-famiglia-jst2324/parma-analytics/)
- Modular data sourcing modules providing a standardized REST api:
  - Copier template for new mining modules: [parma-mining-template](https://github.com/la-famiglia-jst2324/parma-mining-template)
  - [parma-mining-producthunt](https://github.com/la-famiglia-jst2324/parma-mining-producthunt)
  - [parma-mining-peopledatalabs](https://github.com/la-famiglia-jst2324/parma-mining-peopledatalabs)
  - [parma-mining-discord](https://github.com/la-famiglia-jst2324/parma-mining-discord)
  - [parma-mining-github](https://github.com/la-famiglia-jst2324/parma-mining-github)
  - [parma-mining-linkedin](https://github.com/la-famiglia-jst2324/parma-mining-linkedin)
  - [parma-mining-crunchbase](https://github.com/la-famiglia-jst2324/parma-mining-crunchbase)
  - [parma-mining-affinity](https://github.com/la-famiglia-jst2324/parma-mining-affinity)
  - [parma-mining-reddit](https://github.com/la-famiglia-jst2324/parma-mining-reddit)
  - [parma-mining-clearbit](https://github.com/la-famiglia-jst2324/parma-mining-clearbit)

## Visual Impressions

#### Auth & Landing Pages

|                         Landing Page                          |                      Login Page                      |                          News Feed                          |
| :-----------------------------------------------------------: | :--------------------------------------------------: | :---------------------------------------------------------: |
| ![Landing Page](.github/screenshots/generic/landing_page.png) | ![Login Page](.github/screenshots/generic/login.png) | ![News Feed](.github/screenshots/generic/trending_news.png) |

|                       Profile Page                       |                       Settings Page                        |
| :------------------------------------------------------: | :--------------------------------------------------------: |
| ![Profile Page](.github/screenshots/generic/profile.png) | ![Settings Page](.github/screenshots/generic/settings.png) |

#### UI Navigation

|                          Sidebar Navigation                          |                              Pure keyboard Interface                               |
| :------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| ![Sidebar Navigation](.github/screenshots/navigation/navigation.png) | ![Pure keyboard Interface](.github/screenshots/navigation/navigation_keyboard.png) |

#### Companies

|                            Company Dashboard                            |
| :---------------------------------------------------------------------: |
| ![Company Dashboard](.github/screenshots/company/company_dashboard.png) |

|                          Create Company                           |                             Company Attachments                             |
| :---------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| ![Create Company](.github/screenshots/company/create_company.png) | ![Company Attachments](.github/screenshots/company/company_attachments.png) |

#### Buckets (Collections of Companies)

|                           Bucket Dashboard                           |
| :------------------------------------------------------------------: |
| ![Bucket Dashboard](.github/screenshots/bucket/bucket_dashboard.png) |

|                         Create Bucket                          |                         Delete Bucket                          |                         Share Bucket                         |
| :------------------------------------------------------------: | :------------------------------------------------------------: | :----------------------------------------------------------: |
| ![Create Bucket](.github/screenshots/bucket/create_bucket.png) | ![Delete Bucket](.github/screenshots/bucket/delete_bucket.png) | ![Share Bucket](.github/screenshots/bucket/share_bucket.png) |

#### Data Sources

|                          Data Source Dashboard                           |
| :----------------------------------------------------------------------: |
| ![Data Source Dashboard](.github/screenshots/datasource/datasources.png) |

|                             Create Data Source                              |                               Configure Data Source                               |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| ![Create Data Source](.github/screenshots/datasource/create_datasource.png) | ![Configure Data Source](.github/screenshots/datasource/configure_datasource.png) |

#### Bucket

## Deployment

You can find the latest deployment of this project on [parma.software](https://parma.software). The staging deployment is available on [staging.parma.software](https://staging.parma.software).

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

4. **Setup Firebase Admin SDK & GCP Credentials**:

   The Firebase Admin SDK is used to verify user tokens in the backend (Next API routes).
   Please download [this secrets json file](https://www.notion.so/firebase-admin-sdk-certificate-4279aa3b4e904e1b927619ed69537045) from Notion and place it in `/src/api/.secrets/la-famiglia-parma-ai-firebase-adminsdk.json`.

   Also make sure to have `/src/api/.secrets/la-famiglia-parma-ai-secret-manager.json` file with [this certificate](https://www.notion.so/GCP-Service-Account-Certificate-Secret-Manager-4252786a29e64cdcb2d8d359164a1731) to be able to access the secret manager.

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
   export POSTGRES_URL="postgresql://parma-prod-db:parma-prod-db@localhost:9000/parma-prod-db"
   ```

   ```bash
   make test  # runs jest and typescript-coverage-report
   ```

8. Environment Variables Other Than Database URL

   ```bash
   export PARMA_ANALYTICS_BASE_URL=http://127.0.0.1:8000
   ```

9. Optional: Run a production build (used in the CI pipeline)

   ```bash
   make start
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

Follow the steps below to update your local database with recent changes

1. Make sure your .env file contains:

   `POSTGRES_URL="postgresql://parma-prod-db:parma-prod-db@localhost:9000/parma-prod-db"`

2. To apply the recent changes to your local database, run:

   ```bash
    pnpm prisma migrate dev
   ```

## Database Population

If you want to populate your database, run the following commands, under the root directory, in order:

```bash
tsc src/api/db/populate.ts
node src/api/db/populate.js
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

## Deployment Concept

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
