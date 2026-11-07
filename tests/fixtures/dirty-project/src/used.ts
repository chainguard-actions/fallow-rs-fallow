export function usedHelper(value: number): number {
  return value * 2;
}

export function neverImportedHelper(value: number): number {
  return value + 1;
}
