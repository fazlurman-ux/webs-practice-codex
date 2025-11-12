# Custom Hooks

Reusable React hooks for common functionality.

## Guidelines

- Prefix hook files with `use` (e.g., `useLocalStorage.ts`)
- Export hooks as named exports
- Document hook parameters and return values
- Keep hooks focused on a single concern
- Use TypeScript for type safety

## Common Patterns

### useLocalStorage

Persist state to localStorage:

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key ${key}:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### useAsync

Handle async operations:

```typescript
// hooks/useAsync.ts
import { useEffect, useState } from 'react';

interface UseAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsyncState<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!immediate) return;

    const execute = async () => {
      setState({ status: 'pending', data: null, error: null });
      try {
        const response = await asyncFunction();
        setState({ status: 'success', data: response, error: null });
      } catch (error) {
        setState({ status: 'error', data: null, error: error as Error });
      }
    };

    execute();
  }, [asyncFunction, immediate]);

  return state;
}
```

## Import Path Aliases

Use `@/hooks` for cleaner imports:

```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';
```

## Best Practices

1. Always handle cleanup (especially for event listeners and subscriptions)
2. Provide TypeScript types for all parameters and returns
3. Document edge cases and limitations
4. Consider performance implications
5. Test hooks in different scenarios
