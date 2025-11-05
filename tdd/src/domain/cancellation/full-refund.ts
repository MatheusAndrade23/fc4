import { RefundRule } from "./refund-rule.interface";

export class FullRefund implements RefundRule {
  calculateRefund(totalPrice: number): number {
    return 0;
  }
}
