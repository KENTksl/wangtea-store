# AGENTS.md — Project Structure Rules

> These rules are for AI coding agents (Cursor, Copilot, Claude Code, etc.) working in this repository. Read this file before creating, moving, or renaming any file or folder. Do not deviate from this structure unless explicitly instructed by the user in the current task.

## Stack
Next.js (App Router) + Node.js. TypeScript.

## Current directory structure (DO NOT restructure)

```
├── node_modules/              # generated, never edit or commit
├── public/                    # static assets
├── src/
│   └── app/                           # Next.js App Router root
│       ├── about/                     # route: /about
│       ├── admin/                     # route: /admin
│       ├── api/                       # API Route Handlers only
│       │   └── auth/
│       │       ├── login/             # POST /api/auth/login
│       │       ├── logout/            # POST /api/auth/logout
│       │       ├── me/                # GET  /api/auth/me
│       │       └── products/
│       │           ├── [id]/          # /api/auth/products/:id
│       │           └── route.ts       # /api/auth/products
│       ├── contact/
│       │   ├── contact-client.tsx     # client component
│       │   └── page.tsx               # server component (route entry)
│       ├── login/
│       │   └── page.tsx
│       ├── products/
│       ├── components/                # shared UI components (app-wide)
│       ├── globals.css
│       ├── icon.jpg
│       ├── layout.tsx                 # root layout
│       └── page.tsx                   # route: /
```

## Hard rules

1. **Never rename or move top-level directories**: `src`, `app`, `api`, `components`, `public`.
2. **Never edit `node_modules/`.**
3. **Page files**: always named `page.tsx`, placed inside a folder matching the route path (kebab-case).
4. **API route files**: always named `route.ts`, placed inside `src/app/api/<domain>/...`. Dynamic segments use `[param]`.
5. **Client components**: suffix `-client.tsx` or start file with `"use client"`. Server Components are the default — only add `"use client"` when state/effects/events are required.
6. **Component placement**:
   - Used in multiple routes → `src/app/components/`.
   - Used in a single route only → keep inside that route's own folder, NOT in `components/`.
7. **New page**: create a new folder in `src/app/` (kebab-case) containing `page.tsx`. Never create pages outside `src/app/`.
8. **New API endpoint**: 
   - If the domain (e.g. `auth`, `products`) already exists under `src/app/api/`, add the new route inside that existing folder.
   - If it's a new domain, create a new folder at the same level under `src/app/api/`.
   - Handler file must be named `route.ts` and return `NextResponse.json(data, { status })`.
9. **Do not create parallel/duplicate structures**, e.g. do not add `src/pages/` (this project uses App Router only), do not add a second components directory like `src/ui/` or `src/widgets/` without explicit instruction.
10. **Imports**: use the `@/` alias instead of long relative paths (`../../../`).
11. **Naming conventions**: variables/functions = camelCase; components/types/interfaces = PascalCase; route folders/files = kebab-case.
12. **Env vars**: read from `.env.local`, never hardcode secrets.
13. **If a task seems to require changing this structure** (new top-level domain, architecture change, etc.), stop and flag it instead of applying the change automatically.

## Checklist before writing any new file
- [ ] Does this file belong under `src/app/`?
- [ ] Is the route folder name kebab-case?
- [ ] Is `page.tsx` / `route.ts` used correctly per the rules above?
- [ ] Is the component shared (→ `components/`) or route-specific (→ local folder)?
- [ ] Does this avoid creating a new top-level or duplicate directory?
