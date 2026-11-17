export function summarizeB(values: number[]): string {
  let total = 0;
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    total += value;
    if (value < minimum) {
      minimum = value;
    }
    if (value > maximum) {
      maximum = value;
    }
  }
  const average = values.length > 0 ? total / values.length : 0;
  const parts: string[] = [];
  parts.push("total=" + total);
  parts.push("min=" + minimum);
  parts.push("max=" + maximum);
  parts.push("avg=" + average.toFixed(2));
  if (average > 10) {
    parts.push("level=high");
  } else if (average > 5) {
    parts.push("level=medium");
  } else {
    parts.push("level=low");
  }
  return parts.join(", ");
}
