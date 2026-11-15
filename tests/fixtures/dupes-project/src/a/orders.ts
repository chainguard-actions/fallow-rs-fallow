interface Order {
  id: string;
  amount: number;
  status: string;
  customer: string;
}

export function summarizeOrdersA(orders: Order[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const order of orders) {
    if (order.status === "cancelled") {
      continue;
    }
    const key = order.customer.trim().toLowerCase();
    if (!totals[key]) {
      totals[key] = 0;
    }
    totals[key] += order.amount;
    if (totals[key] > 1000) {
      console.log("big spender", key, totals[key]);
    }
    if (order.amount < 0) {
      throw new Error("negative amount for order " + order.id);
    }
  }
  const sorted = Object.keys(totals).sort((left, right) => totals[right] - totals[left]);
  const result: Record<string, number> = {};
  for (const name of sorted) {
    result[name] = Math.round(totals[name] * 100) / 100;
  }
  return result;
}
