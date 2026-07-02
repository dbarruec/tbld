import { useEffect } from 'react';
import { X } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

function PresupuestoPreview({ open, onClose, cliente, proyecto, items, iva, totales }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="modal-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-black">Presupuesto</h2>
            <p className="mt-1 text-sm text-black/50">
              {cliente.trim() || 'Cliente sin especificar'}
              {proyecto.trim() && ` · ${proyecto.trim()}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-md p-1.5 text-black/40 transition-colors duration-150 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-mist text-left text-xs font-semibold uppercase tracking-wide text-black/50">
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3 text-right">Cantidad</th>
                <th className="px-4 py-3 text-right">Precio unit.</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-black">
                    {item.des}
                    <span className="block text-xs text-black/40">{item.mar}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-black tabular-nums">{item.cantidad}</td>
                  <td className="px-4 py-3 text-right text-black tabular-nums">
                    {formatCurrency(item.pre * item.coef)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-black tabular-nums">
                    {formatCurrency(item.pre * item.cantidad * item.coef)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
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
      </div>
    </div>
  );
}

export default PresupuestoPreview;
