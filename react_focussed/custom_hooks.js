// 3.1 Custom Hooks & useMemo/useCallback

// Task: 
// Build a custom hook useFetchWithCache(url) that:
// Caches fetched results in memory
// Avoids re-fetching if the same URL is passed again
// Uses useCallback and useMemo to avoid unnecessary re-renders

// Focus: 
// Hook composition, memoization, cache handling, performance tuning

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
export function useFetchWithCache<T = any>(url: string) {
  const cache = useRef<Record<string, T>>({});
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    if (cache.current[url]) {
      setData(cache.current[url]);
      setLoading(false);
    } else {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result: T = await response.json();
        cache.current[url] = result;
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const result = useMemo(() => ({ data, error, loading }), [data, error, loading]);

  return result;
}