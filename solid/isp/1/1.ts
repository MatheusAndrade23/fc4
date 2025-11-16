interface PaymentService {
  processCreditCardPayment(amount: number);
  validateCreditCard();
  processLoan(amount: number);
}

class CreditCardService implements PaymentService {
  processCreditCardPayment(amount: number) {
    // implementação
  }

  validateCreditCard() {
    // validação do cartao
  }

  processLoan(amount: number) {
    // não deveria existir
    throw new Error("Método não suportado");
  }
}

class LoanService implements PaymentService {
  processLoan(amount: number) {
    // processa o emprestimo
  }
  validateCreditCard() {
    // não deveria existir
    throw new Error("Método não suportado");
  }

  processCreditCardPayment(amount: number) {
    // não deveria existir
    throw new Error("Método não suportado");
  }
}
