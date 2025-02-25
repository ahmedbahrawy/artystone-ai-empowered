# Next.js v15 Frontend Guidelines

This document outlines the structure and best practices for Next.js v15 frontend projects.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Shared React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Shared utilities
├── features/            # Feature-first organization
│   └── auth/           # Example feature
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── utils/      # Feature-specific utilities
│       ├── schemas/    # Feature-specific schemas
│       ├── queries/    # Feature-specific queries
│       ├── constants/  # Feature-specific constants
│       └── index.ts    # Feature exports
└── schemas/            # Domain-driven schemas
    └── user/          # Example domain
        ├── profile.schema.ts
        └── index.ts
```

## Key Conventions

### Components
- Place in `components/` (shared) or `features/*/components/` (feature-specific)
- Use kebab-case for filenames: `user-profile.tsx`
- Add 'use client' directive when using hooks
- One component per file, matching filename

```tsx
// features/auth/components/login-form.tsx
'use client';

import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  return <form>...</form>;
}
```

### Schemas
- Place in `schemas/<domain>/` or `features/*/schemas/`
- Use kebab-case with .schema.ts extension
- Export both schema and type
- One schema per file

```ts
// schemas/user/profile.schema.ts
export const userProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
```

### Features
- Self-contained modules in `features/`
- Include all related components, hooks, utils
- Export via index.ts
- Follow folder structure above

### Hooks
- Place in `features/*/hooks/`
- Prefix with 'use'
- One hook per file
- Kebab-case filenames

```ts
// features/auth/hooks/use-auth.ts
export function useAuth() {
  // ...
}
```

### Constants
- Place in `features/*/constants/`
- Use kebab-case for filenames
- Export constants directly

### UI Components
- Use shadcn/ui from `components/ui/`
- Customize via tailwind.config.ts

## Best Practices
1. Keep features isolated and self-contained
2. Use 'use client' directive for client components
3. Follow consistent naming patterns
4. Export only what's needed via index.ts
5. Maintain single responsibility per file
6. Use TypeScript and Zod for type safety
7. Keep components small and focused
8. Document complex logic
