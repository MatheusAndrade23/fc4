interface CreditCardPaymentProcessor {
  processCreditCard(amount: number);
  validateCreditCard();
}

interface LoanProcessor {
  processLoan(amount: number);
}

class CreditCardService implements CreditCardPaymentProcessor {
  validateCreditCard() {
    // implementação
  }
  processCreditCard(amount: number) {
    // implementação
  }
}

class LoanService implements LoanProcessor {
  processLoan(amount: number) {
    // implementação
  }
}
