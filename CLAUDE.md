# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nest.js application built with TypeScript. Nest.js is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Development Setup

### Prerequisites
- Node.js v20.17.0 or higher
- pnpm 8.0.0 or higher

### Commands
- **Install dependencies**: `pnpm install`
- **Run in development**: `pnpm run start:dev`
- **Run in production**: `pnpm run start:prod`
- **Build**: `pnpm run build`
- **Run tests**: `pnpm test`
- **Run e2e tests**: `pnpm run test:e2e`
- **Run test coverage**: `pnpm run test:cov`
- **Lint**: `pnpm run lint`
- **Format**: `pnpm run format`

## Project Structure

```
save-me/
├── src/
│   ├── app.controller.ts      # Main application controller
│   ├── app.controller.spec.ts # Controller unit tests
│   ├── app.module.ts         # Root application module
│   ├── app.service.ts        # Application service
│   └── main.ts               # Application entry point
├── test/
│   ├── app.e2e-spec.ts       # End-to-end tests
│   └── jest-e2e.json         # Jest e2e configuration
├── eslint.config.mjs         # ESLint configuration
├── nest-cli.json             # Nest CLI configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── tsconfig.build.json       # TypeScript build configuration
```

## Notes

- The repository has Claude AI permissions configured in `.claude/settings.local.json`
- JetBrains IDE settings are present in `.idea/`