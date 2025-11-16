interface Stock {
  isAvailable(): boolean;
  getQuantityByItemId(id: string): number;
}

interface Shipping {
  getAddress(): string;
  calculateFee(): number;
  calculateTotalWeight(): number;
}

interface Payment {
  processPayment();
}

class StockService implements Stock {
  isAvailable(): boolean {
    // implementação
  }
  getQuantityByItemId(id: string): number {
    // implementação
  }
}

class PaypalPaymentService implements Payment {
  processPayment() {
    // implementação
  }

  // muitos outros metodos além de payment.
  isAvailable() {}

  checkValue() {}
}

class ShippingService implements Shipping {
  getAddress(): string {
    // implementação
  }
  calculateFee(): number {
    // implementação
  }
  calculateTotalWeight(): number {
    // implementação
  }
}

class CheckoutService {
  constructor(
    private readonly shippingService: Shipping,
    private readonly stockService: Stock,
    private readonly paymentProcess: Payment
  ) {}

  process() {
    // implementa lógica usando os serviços
  }
}

const checkoutService = new CheckoutService(
  new ShippingService(),
  new StockService(),
  new PaypalPaymentService()
);

checkoutService.process();
