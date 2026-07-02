import { useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { usePresupuesto } from '../hooks/usePresupuesto';
import PresupuestoPreview from '../components/PresupuestoPreview';
import { formatCurrency } from '../utils/currency';
import productos from '../data/productos.json';

function NuevoPresupuesto() {
  const {
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
  } = usePresupuesto();

  const [cliente, setCliente] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const resultados = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (query.length < 2) return [];
    return productos
      .filter(
        (p) =>
          p.des.toLowerCase().includes(query) ||
          p.mar.toLowerCase().includes(query) ||
          p.cod.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [search]);

  const handleSelect = (producto) => {
    agregarItem(producto);
    setSearch('');
    setShowResults(false);
  };

  return (
    <div className="mx-auto flex max-w-[1400px] gap-8 px-8 py-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-extrabold text-black">Nuevo presupuesto</h1>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 100)}
            placeholder="Buscar producto por descripción, marca o código..."
            className="w-full rounded-lg border border-black/15 py-4 pl-12 pr-4 text-base text-black placeholder-black/40 outline-none transition-colors duration-150 focus:border-black"
          />
          {showResults && resultados.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-black/10 bg-white shadow-sm">
              {resultados.map((producto, idx) => (
                <li key={`${producto.cod}-${idx}`}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(producto)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-mist"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-black">{producto.des}</span>
                      <span className="text-xs text-black/50">{producto.mar}</span>
                    </span>
                    <span className="shrink-0 font-medium text-black tabular-nums">
                      {formatCurrency(producto.pre)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-mist text-left text-xs font-semibold uppercase tracking-wide text-black/50">
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3 text-right">Precio unit.</th>
                <th className="px-4 py-3 text-right">Cantidad</th>
                <th className="px-4 py-3 text-right">Coef.</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-black/40">
                    Buscá un producto para empezar
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-5 text-black">{item.des}</td>
                    <td className="px-4 py-5 text-black/50">{item.mar}</td>
                    <td className="px-4 py-5 text-right text-black tabular-nums">
                      {formatCurrency(item.pre)}
                    </td>
                    <td className="px-4 py-5 text-right">
                      <input
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={(e) => updateCantidad(item.id, Number(e.target.value))}
                        className="w-11 rounded-md border border-black/15 px-1.5 py-1 text-right text-sm outline-none focus:border-black"
                      />
                    </td>
                    <td className="px-4 py-5 text-right">
                      <input
                        type="number"
                        step="0.1"
                        min={0}
                        value={item.coef}
                        onChange={(e) => updateCoef(item.id, Number(e.target.value))}
                        className="w-12 rounded-md border border-black/15 px-1.5 py-1 text-right text-sm outline-none focus:border-black"
                      />
                    </td>
                    <td className="px-4 py-5 text-right font-semibold text-black tabular-nums">
                      {formatCurrency(item.pre * item.cantidad * item.coef)}
                    </td>
                    <td className="px-4 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => quitarItem(item.id)}
                        aria-label="Eliminar"
                        className="rounded-md p-1.5 text-black/40 transition-colors duration-150 hover:text-black"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="w-80 shrink-0">
        <div className="sticky top-8 space-y-6 rounded-lg border border-black/10 bg-panel p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/50">
                Cliente
              </label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/50">
                Proyecto
              </label>
              <input
                type="text"
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/50">
                Coeficiente global
              </label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={coeficienteGlobal}
                onChange={(e) => setCoeficienteGlobal(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-black">
              <input
                type="checkbox"
                checked={iva}
                onChange={(e) => setIva(e.target.checked)}
                className="h-4 w-4 rounded border-black/20 accent-black focus:ring-0"
              />
              IVA 21%
            </label>
          </div>

          <div className="space-y-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between text-black/50">
              <span>Costo s/margen</span>
              <span className="tabular-nums">{formatCurrency(totales.costo)}</span>
            </div>
            <div className="flex justify-between text-black/50">
              <span>Precio s/IVA</span>
              <span className="tabular-nums">{formatCurrency(totales.precio)}</span>
            </div>
            {iva && (
              <div className="flex justify-between text-black/50">
                <span>IVA (21%)</span>
                <span className="tabular-nums">{formatCurrency(totales.montoIva)}</span>
              </div>
            )}
            <div className="flex items-baseline justify-between border-t border-black/10 pt-3">
              <span className="font-bold text-black">Total</span>
              <span className="text-2xl font-black tabular-nums text-black">
                {formatCurrency(totales.total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => setShowPreview(true)}
            className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/30 disabled:active:scale-100"
          >
            Ver presupuesto
          </button>
        </div>
      </aside>

      <PresupuestoPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        cliente={cliente}
        proyecto={proyecto}
        items={items}
        iva={iva}
        totales={totales}
      />
    </div>
  );
}

export default NuevoPresupuesto;
