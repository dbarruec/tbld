import { formatCurrency } from './currency';

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);

const LABEL_STYLE =
  'margin:0;font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#999999;';
const VALUE_STYLE = 'margin:4px 0 0;font-size:13px;font-weight:600;color:#000000;';
const TH_STYLE =
  'border-bottom:2px solid #000000;padding:0 0 10px;font-size:9px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#999999;';

function buildFilaHtml(item) {
  const detalle = [item.mar, item.cod, item.det].filter(Boolean).map(escapeHtml).join(' &middot; ');
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eeeeee;">
        <div style="font-size:13px;font-weight:500;color:#000000;">${escapeHtml(item.des)}</div>
        <div style="margin-top:2px;font-size:11px;color:#999999;">${detalle}</div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #eeeeee;text-align:right;font-size:13px;color:#000000;">${item.cantidad}</td>
      <td style="padding:14px 0;border-bottom:1px solid #eeeeee;text-align:right;font-size:13px;color:#000000;">${formatCurrency(item.pre * item.coef)}</td>
      <td style="padding:14px 0;border-bottom:1px solid #eeeeee;text-align:right;font-size:13px;font-weight:600;color:#000000;">${formatCurrency(item.pre * item.cantidad * item.coef)}</td>
    </tr>
  `;
}

function buildHtml({ numero, fecha, cliente, proyecto, items, iva, totales }) {
  const filas = items.map(buildFilaHtml).join('');
  const ivaRow = iva
    ? `<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:#999999;"><span>IVA (21%)</span><span>${formatCurrency(totales.montoIva)}</span></div>`
    : '';

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Presupuesto ${escapeHtml(numero)}</title>
<style>
  @page { margin: 1.5cm; }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    margin: 0;
    padding: 40px 20px;
    background: #f0eeea;
    -webkit-text-fill-color: initial;
  }
  table { width: 100%; border-collapse: collapse; }
  a { color: inherit !important; text-decoration: none !important; }
</style>
</head>
<body>
  <div style="max-width:620px;margin:0 auto;background:#ffffff;">
    <div style="background:#000000;padding:28px 36px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:28px;font-weight:900;color:#ffffff;">TABLADA</span>
      <span style="font-size:10px;letter-spacing:0.15em;opacity:0.6;color:#ffffff;text-transform:uppercase;">${escapeHtml(numero)}</span>
    </div>

    <div style="background:#f7f6f4;border-bottom:1px solid #e8e6e2;padding:20px 36px;display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;">
      <div>
        <p style="${LABEL_STYLE}">Cliente</p>
        <p style="${VALUE_STYLE}">${escapeHtml(cliente || 'Sin especificar')}</p>
      </div>
      <div>
        <p style="${LABEL_STYLE}">Proyecto</p>
        <p style="${VALUE_STYLE}">${escapeHtml(proyecto || 'Sin especificar')}</p>
      </div>
      <div>
        <p style="${LABEL_STYLE}">Fecha</p>
        <p style="${VALUE_STYLE}">${escapeHtml(fecha)}</p>
      </div>
    </div>

    <div style="padding:0 36px;">
      <table>
        <thead>
          <tr>
            <th style="text-align:left;${TH_STYLE}">Descripci&oacute;n</th>
            <th style="text-align:right;${TH_STYLE}">Cant.</th>
            <th style="text-align:right;${TH_STYLE}">P. unit.</th>
            <th style="text-align:right;${TH_STYLE}">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    </div>

    <div style="padding:20px 36px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#999999;">
        <span>Precio s/IVA</span>
        <span>${formatCurrency(totales.precio)}</span>
      </div>
      ${ivaRow}
      <div style="margin-top:16px;border-top:2px solid #000000;padding-top:16px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#000000;">Total</span>
        <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#000000;">${formatCurrency(totales.total)}</span>
      </div>
    </div>

    <div style="background:#000000;padding:16px 36px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:13px;font-weight:700;color:#ffffff;">tbld.com.ar</span>
      <span style="font-size:12px;color:#666666;">dario@tbld.com.ar &middot; +54 911 3618 3567</span>
    </div>
  </div>
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
