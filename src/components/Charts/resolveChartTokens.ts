import { resolveToken } from '../../lib/resolve-token';
import type { FvsToken } from './types';

export function resolveChartToken(token: FvsToken): string {
  const resolved = resolveToken(token);
  return resolved || token;
}

export function resolveChartTokenMap(
  tokens: Record<string, FvsToken>
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, token] of Object.entries(tokens)) {
    result[key] = resolveChartToken(token);
  }
  return result;
}
