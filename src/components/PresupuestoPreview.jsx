import { useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { printPresupuesto } from '../utils/printPresupuesto';
import { useStorage } from '../hooks/useStorage';

const CONTACTO = 'dario@tbld.com.ar · +54 911 3618 3567 · tbld.com.ar';

function PresupuestoPreview({ open, onClose, cliente, proyecto, items, iva, totales }) {
  const { getPresupuestos } = useStorage();

  const numero = useMemo(() => {
    if (!open) return '';
    const correlativo = getPresupuestos().length + 1;
    return `P-${String(correlativo).padStart(4, '0')}`;
  }, [open, getPresupuestos]);

  const fecha = useMemo(() => {
    if (!open) return '';
    return new Date().toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    printPresupuesto({
      numero,
      fecha,
      cliente: cliente.trim(),
      proyecto: proyecto.trim(),
      items,
      iva,
      totales,
    });
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="modal-panel relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-md p-1.5 text-black/40 transition-colors duration-150 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto p-8">
          <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-6">
            <span className="text-2xl font-black uppercase tracking-wide text-black">TABLADA</span>
            <span className="rounded-full border border-black/10 bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black/60">
              Borrador
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Cliente</p>
              <p className="mt-1 font-medium text-black">{cliente.trim() || 'Sin especificar'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Proyecto</p>
              <p className="mt-1 font-medium text-black">{proyecto.trim() || 'Sin especificar'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                N° Presupuesto
              </p>
              <p className="mt-1 font-medium text-black tabular-nums">{numero}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/50">Fecha</p>
              <p className="mt-1 font-medium text-black">{fecha}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-black/10">
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
                    <td className="px-4 py-4">
                      <span className="block font-medium text-black">{item.des}</span>
                      <span className="block text-xs text-black/40">{item.mar}</span>
                    </td>
                    <td className="px-4 py-4 text-right text-black tabular-nums">{item.cantidad}</td>
                    <td className="px-4 py-4 text-right text-black tabular-nums">
                      {formatCurrency(item.pre * item.coef)}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-black tabular-nums">
                      {formatCurrency(item.pre * item.cantidad * item.coef)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 text-sm">
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
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-black px-6 py-4">
            <span className="text-sm font-bold uppercase tracking-wide text-white">Total</span>
            <span className="text-2xl font-black tabular-nums text-white">
              {formatCurrency(totales.total)}
            </span>
          </div>

          <p className="mt-8 border-t border-black/10 pt-4 text-center text-xs text-black/40">
            {CONTACTO}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/10 bg-panel px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-black transition-colors duration-150 hover:bg-black/5"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-all duration-150 active:scale-[0.98]"
          >
            Imprimir / Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresupuestoPreview;
