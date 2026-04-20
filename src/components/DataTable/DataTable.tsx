import React from 'react';

export interface DataTableColumn {
  key: string;
  header: string;
  align?: 'left' | 'right';
  statusColor?: 'nominal' | 'fault' | 'live';
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, string>[];
  caption?: string;
}

const statusColorMap = {
  nominal: 'var(--fvs-green)',
  fault:   'var(--fvs-red)',
  live:    'var(--fvs-amber)',
};

export function DataTable({ columns, rows, caption }: DataTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums',
        fontSize: 12,
      }}>
        {caption && <caption style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)', textAlign: 'left', padding: '0 10px 8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  textAlign: col.align === 'right' ? 'right' : 'left',
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-muted)',
                  padding: '6px 10px',
                  borderBottom: '1px solid var(--line-strong)',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ transition: 'background var(--dur-fast)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-inset)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
            >
              {columns.map((col, j) => (
                <td
                  key={col.key}
                  style={{
                    padding: '9px 10px',
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--line)',
                    color: col.statusColor ? statusColorMap[col.statusColor] : 'var(--fg)',
                    textAlign: col.align === 'right' ? 'right' : 'left',
                    fontWeight: j === 0 ? 400 : 400,
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
