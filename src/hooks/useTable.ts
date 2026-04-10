import { useState, useEffect } from 'react';

export const useTablePersistence = (tableId: string) => {
  const [columnVisibility, setColumnVisibilityState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(`table-columns-${tableId}`);
    if (saved) {
      setColumnVisibilityState(JSON.parse(saved));
    }
  }, [tableId]);

  const setColumnVisibility = (updater: any) => {
    setColumnVisibilityState(prev => {
      const newValue = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(`table-columns-${tableId}`, JSON.stringify(newValue));
      return newValue;
    });
  };

  return [columnVisibility, setColumnVisibility] as const;
};