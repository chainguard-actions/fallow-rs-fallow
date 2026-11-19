export function formatA(items: number[]): string {
  const result: string[] = [];
  for (const item of items) {
    if (item % 2 === 0) {
      result.push(`even:${item}`);
    } else if (item % 3 === 0) {
      result.push(`three:${item}`);
    } else {
      result.push(`other:${item}`);
    }
  }
  const joined = result.join(",");
  const trimmed = joined.trim();
  const upper = trimmed.toUpperCase();
  const wrapped = `[${upper}]`;
  return wrapped.length > 100 ? wrapped.slice(0, 100) : wrapped;
}
