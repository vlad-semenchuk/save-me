# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS monorepo built with TypeScript. It contains multiple applications and shared libraries using NestJS's
monorepo architecture. NestJS is a progressive Node.js framework for building efficient, reliable and scalable
server-side applications.

## Development Setup

### Prerequisites

- Node.js v20.17.0 or higher
- pnpm 8.0.0 or higher

### Commands

- **Install dependencies**: `pnpm install`
- **Run in development**:
    - Default app: `pnpm run start:dev`
    - Specific app: `pnpm run start:dev <app-name>` (e.g., `pnpm run start:dev save-me-bot`)
- **Run in production**:
    - Default: `pnpm run start:prod`
- **Build**:
    - Default app: `pnpm run build`
    - Specific app: `pnpm run build <app-name>` (e.g., `pnpm run build save-me-bot`)
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
│   └── save-me-bot/          # Save Me bot application
│       ├── src/
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
│   ├── core/                 # Core library
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── lib/
│   │   │       └── app-builder.ts
│   │   └── tsconfig.lib.json
│   └── save-me-bot/          # Save Me bot library
│       ├── src/
│       │   ├── index.ts
│       │   └── lib/
│       │       ├── controllers/
│       │       ├── save-me-bot.module.ts
│       │       └── save-me-bot.service.ts
│       └── tsconfig.lib.json
├── eslint.config.mjs         # ESLint configuration
├── nest-cli.json             # Nest CLI configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── tsconfig.build.json       # TypeScript build configuration
```

## Changelog and Version Management

This project maintains a CHANGELOG.md file following the Keep a Changelog format for tracking version releases and
significant changes.

### How it works:

- **Conventional commits**: Use `pnpm run commit` to create standardized commit messages
- **Version releases**: Use `pnpm run changelog` to generate version entries from conventional commits
- **Release types**:
    - `pnpm run changelog:patch` - Bug fixes (0.0.x)
    - `pnpm run changelog:minor` - New features (0.x.0)
    - `pnpm run changelog:major` - Breaking changes (x.0.0)
    - `pnpm run changelog:first` - Initial release

### Important for Claude Code:

- Check CHANGELOG.md to understand the project's release history
- Use conventional commit format (feat:, fix:, docs:, etc.) for better changelog generation
- Update the Unreleased section when making significant changes worth noting

### Commit types:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Maintenance tasks

### Commit message guidelines:

- Keep commit messages short and concise (one line only)
- Use conventional commit format (feat:, fix:, docs:, etc.) without additional decorations
- NEVER mention Claude Code, automation tools, or add any attribution in commit messages
- NEVER add multi-line commit messages with detailed descriptions
- Example: `feat: integrate Grammy Telegram bot framework` (good)
- Not: Long multi-line commits with bullet points and tool mentions (bad)

## Notesg

- The repository has Claude AI permissions configured in `.claude/settings.local.json`
- JetBrains IDE settings are present in `.idea/`