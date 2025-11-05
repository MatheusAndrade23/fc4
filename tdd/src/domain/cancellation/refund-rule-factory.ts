import { FullRefund } from "./full-refund";
import { NoRefund } from "./no-refund";
import { PartialRefund } from "./partial-refund";
import { RefundRule } from "./refund-rule.interface";

export class RefundRuleFactory {
  static getRefundRule(daysUntilCheckIn: number): RefundRule {
    if (daysUntilCheckIn > 7) {
      return new FullRefund();
    } else if (daysUntilCheckIn) {
      return new PartialRefund();
    }

    return new NoRefund();
  }
}
