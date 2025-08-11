# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS monorepo built with TypeScript. It contains multiple applications and shared libraries using NestJS's monorepo architecture. NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Development Setup

### Prerequisites
- Node.js v20.17.0 or higher
- pnpm 8.0.0 or higher

### Commands
- **Install dependencies**: `pnpm install`
- **Run in development**: 
  - API app: `pnpm run start:dev:api`
  - Hello World app: `pnpm run start:dev:hello-world`
  - Default (api): `pnpm run start:dev`
- **Run in production**: 
  - API app: `pnpm run start:prod:api`
  - Hello World app: `pnpm run start:prod:hello-world`
  - Default (api): `pnpm run start:prod`
- **Build**: 
  - All apps: `pnpm run build`
  - API app: `pnpm run build:api`
  - Hello World app: `pnpm run build:hello-world`
- **Run tests**: `pnpm test`
- **Run e2e tests**: `pnpm run test:e2e`
- **Run test coverage**: `pnpm run test:cov`
- **Lint**: `pnpm run lint`
- **Format**: `pnpm run format`
- **Create conventional commit**: `pnpm run commit` (interactive commit with Commitizen)
- **Update changelog**: `pnpm run changelog` (generates changelog from commits)
- **First release**: `pnpm run changelog:first` (for initial release)

## Project Structure

This is a NestJS monorepo with multiple applications and shared libraries:

```
save-me/
├── apps/                      # Application packages
│   ├── api/                  # Main API application
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   ├── test/
│   │   └── tsconfig.app.json
│   └── hello-world/          # Hello World application
│       ├── src/
│       │   ├── hello-world.controller.ts
│       │   ├── hello-world.service.ts
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── test/
│       └── tsconfig.app.json
├── libs/                      # Shared libraries
│   ├── config/               # Configuration library
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── lib/
│   │   │       └── validate-env.ts
│   │   └── tsconfig.lib.json
│   └── core/                 # Core library
│       ├── src/
│       │   ├── index.ts
│       │   └── lib/
│       │       └── app-builder.ts
│       └── tsconfig.lib.json
├── eslint.config.mjs         # ESLint configuration
├── nest-cli.json             # Nest CLI configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── tsconfig.build.json       # TypeScript build configuration
```

## Changelog and Commit History

This project maintains a CHANGELOG.md file to track all changes and provide memory context for Claude Code. The changelog serves two purposes:

1. **Standard changelog**: Following the Keep a Changelog format for version releases
2. **Commit history for Claude Code**: Every commit is automatically logged with timestamp, branch, and message

### How it works:
- **Automatic logging**: A git post-commit hook automatically adds each commit to CHANGELOG.md
- **Conventional commits**: Use `pnpm run commit` to create standardized commit messages
- **Version releases**: Use `pnpm run changelog` to generate version entries from conventional commits

### Important for Claude Code:
- Always check CHANGELOG.md to understand recent project changes
- The "Commit History" section provides context about what has been done previously
- When making changes, reference previous related commits if applicable
- Use conventional commit format (feat:, fix:, docs:, etc.) for better changelog generation

### Commit types:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Maintenance tasks

## Notes

- The repository has Claude AI permissions configured in `.claude/settings.local.json`
- JetBrains IDE settings are present in `.idea/`