---
name: HonoMigration
description: Migrate Next.js modules from Server Actions and API routes to Hono RPC endpoints with React Query
argument-hint: Module name(s), endpoints, business rules, and scope files
---

**We are migrating the entire application from Server Actions + Next.js API Routes to Hono RESTful API endpoints. NOTHING remains from Next API Routes or Server Actions. ALL server actions convert to Hono RESTful API endpoints, including infrastructure routes (auth callbacks, webhooks).**

**Current architecture:**
- Server Actions (`app/actions/*.ts`)
- Per-module Next.js route handlers (`app/api/**/route.ts`)
- Hono catch-all API entry (`app/api/[[...route]]/route.ts`)
- Module routes under `app/api/[[...route]]/routes/*.ts`
- Type-safe client (Hono `hc`) and React Query hooks

**Target architecture:**
- Hono routes + React Query hooks as the only data path
- Zero Server Actions remaining
- Zero Next.js API routes remaining
- Single auth call per request
- Redis caching on all GET requests

## Inputs

**Required placeholders:**
- **Modules**: {MODULES_TO_MIGRATE}
- **Endpoints**: {ENDPOINTS_TO_MIGRATE}
- **Business rules**: {BUSINESS_RULES}
- **Scope files**: {SCOPE}

## Constraints

**Architectural requirements:**
- Use `/api/[module]/[resource]` endpoint format only
- Single source of truth for constants and types
- No `any` types; use `unknown` with type guards for uncertain data
- Keep changes in-place; avoid renamed copies
- Import from SSOT only; never duplicate values

**API requirements:**
- Zod validation on all endpoints
- Permission checks via `PermissionService`
- Audit logging with `createAuditLog()`
- Cache invalidation: `api:*/api/{module}*` pattern
- Proper HTTP status codes (200, 201, 400, 403, 404)

## Pre-flight Checklist

**Before starting each migration:**

- [ ] QueryClientProvider with staleTime: 0
- [ ] Middleware called with `()`
- [ ] Redis dual config in BOTH cache files
- [ ] Cache pattern: `api:*/api/[module]*`
- [ ] Invalidation wrapped in Promise
- [ ] Broad query invalidation
- [ ] Auth reads header, doesn't re-auth
- [ ] Middleware order: logger → cors → auth → cache
- [ ] Route registered in main file
- [ ] Types from Hono client
- [ ] Extract server error messages
- [ ] Test in Network tab, not Elements

## Migration Workflow

### Phase 1: Inventory and Mapping

**1.1 Enumerate existing implementation**

For each module in {MODULES_TO_MIGRATE}:

- Locate Server Actions: `app/actions/{module}.ts`
- Locate API routes: `app/api/{module}/route.ts`, `app/api/{module}/[id]/route.ts`
- Locate Hono endpoints (if any): `app/api/[[...route]]/routes/{module}.ts`
- Locate UI components importing these files

**1.2 Create mapping table**

| Old Path | Endpoint | Hook | UI Call Site(s) |
|----------|----------|------|-----------------|
| `actions/{module}.ts:createFn` | `POST /api/{module}` | `useCreate{Module}()` | `components/forms/{module}-form.tsx:45` |
| `api/{module}/route.ts:GET` | `GET /api/{module}` | `use{Module}s()` | `app/{module}/page.tsx:12` |
| `api/{module}/[id]/route.ts:GET` | `GET /api/{module}/:id` | `use{Module}()` | `components/{module}-detail.tsx:8` |

**1.3 Identify behavior gaps**

Check for:
- Validation logic (Zod schemas)
- Permission checks (role-based access)
- Audit logging (who did what when)
- Cache invalidation (mutation side effects)
- Domain-specific rules from {BUSINESS_RULES}

### Phase 2: Implement Hono Routes (Example: {MODULE})

**2.1 Create route file**

Create `app/api/[[...route]]/routes/{module}.ts`:

```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db } from '@/lib/db';
import { {Module}Schema, {Module}PatchSchema } from '@/lib/schemas';
import { auth } from '@/lib/auth/proxy';
import { cacheMiddleware, invalidateCache } from '@/lib/cache';
import { PermissionService } from '@/lib/auth/permissions';
import { createAuditLog } from '@/lib/audit';

const {module}Routes = new Hono()
  .use('*', cacheMiddleware())

  // GET list
  .get('/', async (c) => {
    const { userId } = await auth(c);
    const site = c.req.query('site');

    const items = await db.{module}.findMany({
      where: site ? { siteId: site } : {},
      orderBy: { createdAt: 'desc' }
    });

    return c.json(items);
  })

  // POST create
  .post('/', zValidator('json', {Module}Schema), async (c) => {
    const { userId } = await auth(c);
    const data = c.req.valid('json');

    // Permission check
    const hasPermission = await PermissionService.can(
      userId,
      'CREATE',
      '{MODULE}'
    );
    if (!hasPermission) {
      return c.json({ error: 'Permission denied' }, 403);
    }

    const item = await db.{module}.create({ data });

    // Audit log
    await createAuditLog({
      userId,
      action: 'CREATE',
      resource: '{MODULE}',
      resourceId: item.id,
      metadata: { siteId: item.siteId }
    });

    // Cache invalidation
    await invalidateCache('api:*/api/{module}*');

    return c.json(item, 201);
  })

  // GET by ID
  .get('/:id', async (c) => {
    const { userId } = await auth(c);
    const id = c.req.param('id');

    const item = await db.{module}.findUnique({ where: { id } });
    if (!item) {
      return c.json({ error: 'Not found' }, 404);
    }

    return c.json(item);
  })

  // PATCH update
  .patch('/:id', zValidator('json', {Module}PatchSchema), async (c) => {
    const { userId } = await auth(c);
    const id = c.req.param('id');
    const data = c.req.valid('json');

    const hasPermission = await PermissionService.can(
      userId,
      'UPDATE',
      '{MODULE}'
    );
    if (!hasPermission) {
      return c.json({ error: 'Permission denied' }, 403);
    }

    const item = await db.{module}.update({
      where: { id },
      data
    });

    await createAuditLog({
      userId,
      action: 'UPDATE',
      resource: '{MODULE}',
      resourceId: id,
      metadata: { changes: data }
    });

    await invalidateCache('api:*/api/{module}*');

    return c.json(item);
  })

  // DELETE
  .delete('/:id', async (c) => {
    const { userId } = await auth(c);
    const id = c.req.param('id');

    const hasPermission = await PermissionService.can(
      userId,
      'DELETE',
      '{MODULE}'
    );
    if (!hasPermission) {
      return c.json({ error: 'Permission denied' }, 403);
    }

    await db.{module}.delete({ where: { id } });

    await createAuditLog({
      userId,
      action: 'DELETE',
      resource: '{MODULE}',
      resourceId: id
    });

    await invalidateCache('api:*/api/{module}*');

    return c.json({ success: true });
  });

export { {module}Routes };
```

**2.2 Register route in main app**

Update `app/api/[[...route]]/route.ts`:

```typescript
import { {module}Routes } from './routes/{module}';

/**
 * {Module} endpoints
 *
 * GET    /api/{module}      - List all {modules}
 * POST   /api/{module}      - Create {module}
 * GET    /api/{module}/:id  - Get {module} by ID
 * PATCH  /api/{module}/:id  - Update {module}
 * DELETE /api/{module}/:id  - Delete {module}
 */
app.route('/{module}', {module}Routes);
```

### Phase 3: Add Schema Patch Type

**3.1 Check/add patch schema**

In `lib/schemas/index.ts`:

```typescript
export const {Module}PatchSchema = {Module}Schema.partial();
export type {Module}PatchInput = z.input<typeof {Module}PatchSchema>;
```

### Phase 4: Client Types and Methods

**4.1 Define types in client.ts**

Update `lib/utils/client.ts`:

```typescript
import type { {Module}Input, {Module}PatchInput } from '@/lib/schemas';

// List params
type {Module}ListParams = {
  site?: string;
};

// Update input (omit immutable fields)
type {Module}UpdateInput = Omit<{Module}PatchInput, 'id' | 'createdAt'>;

// Response types
type {Module}MutationResponse = {
  id: string;
  // ... other fields
};

type {Module}DeleteResponse = {
  success: boolean;
};

// Client types
type {Module}ByIdClient = ReturnType<typeof createClient<typeof {module}Routes>>;
type {Module}CollectionClient = ReturnType<typeof createClient<typeof {module}Routes>>;

// Add to ApiClientAccess interface
interface ApiClientAccess {
  // ... existing entries
  {module}: {
    $get: {Module}CollectionClient['$get'];
    $post: {Module}CollectionClient['$post'];
    ':id': {
      $get: {Module}ByIdClient[':id']['$get'];
      $patch: {Module}ByIdClient[':id']['$patch'];
      $delete: {Module}ByIdClient[':id']['$delete'];
    };
  };
}

// Create client instances
const {module}Client = createClient<typeof {module}Routes>(baseUrl, '{module}');
const {module}ByIdClient = createClient<typeof {module}Routes>(baseUrl, '{module}/:id');

// Add API methods (INSIDE api object, BEFORE closing brace)
export const api = {
  // ... existing methods

  // {Module} endpoints
  {module}: {
    list: async (params?: {Module}ListParams) => {
      const query = params?.site ? `?site=${params.site}` : '';
      const res = await {module}Client.$get({
        query: query as any
      });
      return res.json();
    },

    create: async (data: {Module}Input) => {
      const res = await {module}Client.$post({
        json: data
      });
      return res.json();
    },

    getById: async (id: string) => {
      const res = await {module}ByIdClient[':id'].$get({
        param: { id }
      });
      return res.json();
    },

    update: async (id: string, data: {Module}UpdateInput) => {
      const res = await {module}ByIdClient[':id'].$patch({
        param: { id },
        json: data
      });
      return res.json();
    },

    delete: async (id: string) => {
      const res = await {module}ByIdClient[':id'].$delete({
        param: { id }
      });
      return res.json();
    },
  },
};
```

### Phase 5: React Query Hooks

**5.1 Create hooks file**

Create `lib/hooks/use{Module}.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/utils/client';
import { toast } from 'sonner';
import type { {Module}Input, {Module}UpdateInput } from '@/lib/schemas';

// Query: List
export function use{Module}s(site?: string) {
  return useQuery({
    queryKey: ['{modules}', site],
    queryFn: () => api.{module}.list({ site }),
  });
}

// Query: Single
export function use{Module}(id: string | null) {
  return useQuery({
    queryKey: ['{module}', id],
    queryFn: () => api.{module}.getById(id!),
    enabled: !!id,
  });
}

// Mutation: Create
export function useCreate{Module}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {Module}Input) => api.{module}.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{modules}'] });
      toast.success('{Module} created');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Creation failed';
      toast.error(message);
    },
  });
}

// Mutation: Update
export function useUpdate{Module}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: {Module}UpdateInput }) =>
      api.{module}.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['{modules}'] });
      queryClient.invalidateQueries({ queryKey: ['{module}', variables.id] });
      toast.success('{Module} updated');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Update failed';
      toast.error(message);
    },
  });
}

// Mutation: Delete
export function useDelete{Module}() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.{module}.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{modules}'] });
      toast.success('{Module} deleted');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Deletion failed';
      toast.error(message);
    },
  });
}
```

### Phase 6: UI Migration

**6.1 Replace Server Action imports**

Before:
```typescript
import { create{Module}, update{Module} } from '@/app/actions/{module}';
```

After:
```typescript
import { useCreate{Module}, useUpdate{Module} } from '@/lib/hooks/use{Module}';
```

**6.2 Replace SWR with React Query**

Before:
```typescript
const { data, mutate } = useSWR('/api/{module}', fetcher);
```

After:
```typescript
const { data, refetch } = use{Module}s(siteId);
```

**6.3 Update form submissions**

Before:
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  try {
    await create{Module}(data);
    toast.success('Success');
    mutate();
  } catch (error) {
    toast.error('Failed');
  } finally {
    setIsSubmitting(false);
  }
};
```

After:
```typescript
const createMutation = useCreate{Module}();

const handleSubmit = (data: {Module}Input) => {
  createMutation.mutate(data);
};

// In JSX:
<Button disabled={createMutation.isPending}>
  {createMutation.isPending ? 'Saving...' : 'Save'}
</Button>
```

### Phase 7: Cleanup

**7.1 Remove old files**

Delete:
- `app/actions/{module}.ts`
- `app/api/{module}/` (entire directory)

**7.2 Verify no dangling imports**

Search codebase for:
- `from '@/app/actions/{module}'`
- `from '@/app/api/{module}'`

### Phase 8: Validation

**8.1 Critical validation sequence**

```bash
# Step 1: Type check (must pass first)
bunx tsgo --noEmit

# Step 2: Only after zero errors, run build
bun run build
```

**8.2 Runtime verification**

- [ ] Redis shows cache keys: `redis-cli KEYS "api:*/api/{module}*"`
- [ ] X-Cache headers present: Check Network tab
- [ ] Tables update instantly after mutations
- [ ] No console errors in browser
- [ ] Forms show server error messages
- [ ] Permission checks work correctly

## Post-migration Checklist

**Technical validation:**

- [ ] Build succeeds
- [ ] Redis shows cache keys
- [ ] X-Cache headers present
- [ ] Tables update instantly
- [ ] No console errors
- [ ] Forms show server error messages
- [ ] Permission checks work

**Architecture validation:**

- [ ] Zero server actions remaining
- [ ] Zero Next.js API routes remaining
- [ ] All endpoints in `app/api/[[...route]]/routes/*.ts`
- [ ] All queries/mutations use React Query hooks
- [ ] Redis caching on all GET requests
- [ ] Single auth call per request
- [ ] No `any` types; full RPC type inference

**Performance targets:**

- [ ] 50% reduction in auth overhead
- [ ] 90%+ cache hit rate on repeated queries
- [ ] Instant UI updates after mutations
- [ ] Zero manual cache management

## Common Mistakes to Avoid

**Type definitions:**
- ❌ Don't add duplicate types; check existence first
- ✅ Import from SSOT only

**API method placement:**
- ❌ Don't add methods after `api` object closing brace
- ✅ Add inside the object, before the closing brace

**React Query configuration:**
- ❌ Don't use `staleTime > 0`
- ✅ Use `staleTime: 0` for immediate refetch

**Middleware:**
- ❌ Don't forget to call: `cacheMiddleware`
- ✅ Call with parentheses: `cacheMiddleware()`

**Query invalidation:**
- ❌ Don't use specific keys: `queryKey: ['{module}', id]`
- ✅ Use broad patterns: `queryKey: ['{modules}']`

**Testing:**
- ❌ Don't test in Elements tab
- ✅ Test in Network tab for X-Cache headers

## Deliverables

For each migrated module, provide:

1. **Migration mapping table** (old path → endpoint → hook → UI call site)
2. **File change list**:
   - Created: `app/api/[[...route]]/routes/{module}.ts`, `lib/hooks/use{Module}.ts`
   - Modified: `app/api/[[...route]]/route.ts`, `lib/utils/client.ts`, `lib/schemas/index.ts`, UI components
   - Deleted: `app/actions/{module}.ts`, `app/api/{module}/`
3. **Validation summary**:
   - Type check result: `bunx tsgo --noEmit`
   - Build result: `bun run build`
   - Runtime checks: Redis keys, X-Cache headers, UI behavior
4. **Coverage report**: X/X items completed, blockers listed with file paths

## Output Format

```markdown
## {MODULE_NAME} Migration

### Mapping Table
| Old Path | Endpoint | Hook | UI Call Sites |
|----------|----------|------|---------------|
| ... | ... | ... | ... |

### Files Changed
- Created: [list]
- Modified: [list]
- Deleted: [list]

### Validation Results
- Type check: ✅ PASS / ❌ FAIL
- Build: ✅ PASS / ❌ FAIL
- Runtime: ✅ PASS / ❌ FAIL

### Pre-flight Checklist: [X/12]
### Post-migration Checklist: [X/7]
### Architecture Validation: [X/8]
### Performance Targets: [X/4]

### Coverage: X/X items (100%)
```

---

**Focus on one module at a time. Complete all phases before proceeding to the next module.**
