import { useCallback } from 'react';

const STORAGE_KEY = 'tbld_presupuestos';

export function useStorage() {
  const getPresupuestos = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const savePresupuesto = useCallback(
    (presupuesto) => {
      const presupuestos = getPresupuestos();
      const index = presupuestos.findIndex((p) => p.id === presupuesto.id);
      if (index >= 0) {
        presupuestos[index] = presupuesto;
      } else {
        presupuestos.push(presupuesto);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(presupuestos));
      return presupuestos;
    },
    [getPresupuestos]
  );

  const deletePresupuesto = useCallback(
    (id) => {
      const presupuestos = getPresupuestos().filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(presupuestos));
      return presupuestos;
    },
    [getPresupuestos]
  );

  return { getPresupuestos, savePresupuesto, deletePresupuesto };
}
