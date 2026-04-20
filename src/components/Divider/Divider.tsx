import React from 'react';

export type DividerWeight = 'hair' | 'standard' | 'strong' | 'double';

export interface DividerProps {
  weight?: DividerWeight;
}

const styles: Record<DividerWeight, React.CSSProperties> = {
  hair:     { borderTop: '1px solid var(--line-hair)' },
  standard: { borderTop: '1px solid var(--line)' },
  strong:   { borderTop: '1px solid var(--line-strong)' },
  double:   { borderTop: '3px double var(--line-strong)' },
};

export function Divider({ weight = 'standard' }: DividerProps) {
  return (
    <hr style={{
      border: 'none',
      margin: 'var(--s-7) 0',
      ...styles[weight],
    }} />
  );
}
