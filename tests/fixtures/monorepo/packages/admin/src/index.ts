export function dashboard(user: string): string {
  return `admin ${user}`;
}

console.log(dashboard("root"));
