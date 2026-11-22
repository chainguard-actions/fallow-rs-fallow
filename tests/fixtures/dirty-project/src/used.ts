export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export function neverCalledHelper(value: number): number {
  return value * 2;
}
