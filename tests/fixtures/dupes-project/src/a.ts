export function summarizeA(values: number[]): string {
  let total = 0;
  let max = Number.NEGATIVE_INFINITY;
  let min = Number.POSITIVE_INFINITY;
  for (const value of values) {
    total += value;
    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }
  }
  const average = values.length > 0 ? total / values.length : 0;
  const parts = [`total=${total}`, `max=${max}`, `min=${min}`, `avg=${average}`];
  return parts.join(", ");
}
