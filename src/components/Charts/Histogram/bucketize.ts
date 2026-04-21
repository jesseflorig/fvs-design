export interface HistogramBucket {
  label: string;
  count: number;
}

function sturgesBins(n: number): number {
  return Math.ceil(Math.log2(n) + 1);
}

export function bucketize(values: number[], bins?: number): HistogramBucket[] {
  if (values.length === 0) return [];

  const k = bins ?? sturgesBins(values.length);
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return [{ label: String(min), count: values.length }];
  }

  const step = (max - min) / k;
  const buckets: HistogramBucket[] = Array.from({ length: k }, (_, i) => {
    const lo = min + i * step;
    const hi = min + (i + 1) * step;
    const loStr = Number.isInteger(lo) ? String(lo) : lo.toFixed(1);
    const hiStr = Number.isInteger(hi) ? String(hi) : hi.toFixed(1);
    return { label: `${loStr}–${hiStr}`, count: 0 };
  });

  for (const v of values) {
    if (isNaN(v) || v == null) continue;
    let i = Math.floor((v - min) / step);
    if (i >= k) i = k - 1;
    buckets[i].count++;
  }

  return buckets;
}
