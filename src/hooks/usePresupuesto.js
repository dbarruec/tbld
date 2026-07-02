import { useCallback, useMemo, useState } from 'react';

const IVA_RATE = 0.21;

export function usePresupuesto() {
  const [items, setItems] = useState([]);
  const [coeficienteGlobal, setCoeficienteGlobal] = useState(2);
  const [iva, setIva] = useState(false);

  const agregarItem = useCallback(
    (producto) => {
      setItems((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          cod: producto.cod,
          des: producto.des,
          mar: producto.mar,
          det: producto.det,
          pre: producto.pre,
          cantidad: 1,
          coef: coeficienteGlobal,
        },
      ]);
    },
    [coeficienteGlobal]
  );

  const quitarItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateCantidad = useCallback((id, cantidad) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item))
    );
  }, []);

  const updateCoef = useCallback((id, coef) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, coef } : item)));
  }, []);

  const totales = useMemo(() => {
    const costo = items.reduce((sum, item) => sum + item.pre * item.cantidad, 0);
    const precio = items.reduce((sum, item) => sum + item.pre * item.cantidad * item.coef, 0);
    const montoIva = iva ? precio * IVA_RATE : 0;
    const total = precio + montoIva;
    return { costo, precio, montoIva, total };
  }, [items, iva]);

  return {
    items,
    coeficienteGlobal,
    setCoeficienteGlobal,
    iva,
    setIva,
    totales,
    agregarItem,
    quitarItem,
    updateCantidad,
    updateCoef,
  };
}
