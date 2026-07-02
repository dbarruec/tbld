import { formatCurrency } from './currency';

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);

const LABEL_STYLE =
  'font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#999999;margin:0;';
const CELL_STYLE = 'padding:12px 16px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#999999;border-bottom:1px solid #e5e5e5;';

function buildFilaHtml(item) {
  return `
    <tr>
      <td style="padding:16px;border-bottom:1px solid #e5e5e5;">
        <div style="font-weight:600;">${escapeHtml(item.des)}</div>
        <div style="font-size:12px;color:#999999;margin-top:2px;">${escapeHtml(item.mar)}</div>
      </td>
      <td style="padding:16px;border-bottom:1px solid #e5e5e5;text-align:right;">${item.cantidad}</td>
      <td style="padding:16px;border-bottom:1px solid #e5e5e5;text-align:right;">${formatCurrency(item.pre * item.coef)}</td>
      <td style="padding:16px;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:600;">${formatCurrency(item.pre * item.cantidad * item.coef)}</td>
    </tr>
  `;
}

function buildHtml({ numero, fecha, cliente, proyecto, items, iva, totales }) {
  const filas = items.map(buildFilaHtml).join('');
  const ivaRow = iva
    ? `<div style="display:flex;justify-content:space-between;color:#666666;margin-top:8px;"><span>IVA (21%)</span><span>${formatCurrency(totales.montoIva)}</span></div>`
    : '';

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Presupuesto ${escapeHtml(numero)}</title>
<style>
  @page { margin: 1.5cm; }
  * { box-sizing: border-box; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #000000;
    background: #ffffff;
    margin: 0;
    padding: 32px;
  }
  table { width: 100%; border-collapse: collapse; }
</style>
</head>
<body>
  <div style="display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid #e5e5e5;padding-bottom:24px;">
    <span style="font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;">TABLADA</span>
    <span style="border:1px solid #e5e5e5;background:#f5f5f5;border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#666666;">Borrador</span>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 32px;margin-top:24px;font-size:14px;">
    <div>
      <p style="${LABEL_STYLE}">Cliente</p>
      <p style="margin:4px 0 0;font-weight:500;">${escapeHtml(cliente || 'Sin especificar')}</p>
    </div>
    <div>
      <p style="${LABEL_STYLE}">Proyecto</p>
      <p style="margin:4px 0 0;font-weight:500;">${escapeHtml(proyecto || 'Sin especificar')}</p>
    </div>
    <div>
      <p style="${LABEL_STYLE}">N&deg; Presupuesto</p>
      <p style="margin:4px 0 0;font-weight:500;">${escapeHtml(numero)}</p>
    </div>
    <div>
      <p style="${LABEL_STYLE}">Fecha</p>
      <p style="margin:4px 0 0;font-weight:500;">${escapeHtml(fecha)}</p>
    </div>
  </div>

  <table style="margin-top:32px;border:1px solid #e5e5e5;border-radius:8px;">
    <thead>
      <tr style="background:#f5f5f5;">
        <th style="text-align:left;${CELL_STYLE}">Descripci&oacute;n</th>
        <th style="text-align:right;${CELL_STYLE}">Cantidad</th>
        <th style="text-align:right;${CELL_STYLE}">Precio unit.</th>
        <th style="text-align:right;${CELL_STYLE}">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${filas}
    </tbody>
  </table>

  <div style="margin-top:24px;font-size:14px;">
    <div style="display:flex;justify-content:space-between;color:#666666;">
      <span>Precio s/IVA</span>
      <span>${formatCurrency(totales.precio)}</span>
    </div>
    ${ivaRow}
  </div>

  <div style="margin-top:16px;background:#000000;color:#ffffff;border-radius:8px;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;">
    <span style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Total</span>
    <span style="font-size:24px;font-weight:900;">${formatCurrency(totales.total)}</span>
  </div>

  <p style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e5e5;text-align:center;font-size:12px;color:#999999;">
    dario@tbld.com.ar &middot; +54 911 3618 3567 &middot; tbld.com.ar
  </p>
</body>
</html>`;
}

export function printPresupuesto(data) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(buildHtml(data));
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
}
