import { useState, useEffect } from 'react';
import getSupaBaseClient from '../supabase-client';

export default function useSupabaseFetch(table, options = {}, schema = 'com') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const supabase = getSupaBaseClient(schema);
        let query = supabase.from(table);
        if (options.select) query = query.select(options.select);
        if (options.filters) {
          options.filters.forEach(f => {
            if (f.type === 'eq') query = query.eq(f.column, f.value);
            if (f.type === 'neq') query = query.neq(f.column, f.value);
          });
        }
        if (options.order) query = query.order(options.order.column, { ascending: options.order.ascending });
        const { data, error } = await query;
        if (isMounted) {
          if (error) throw error;
          setData(data);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [table, JSON.stringify(options), schema]);

  return { data, loading, error };
}