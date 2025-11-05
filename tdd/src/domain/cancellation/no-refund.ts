import { RefundRule } from "./refund-rule.interface";

export class NoRefund implements RefundRule {
  calculateRefund(totalPrice: number): number {
    return totalPrice;
  }
}
