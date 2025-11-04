import { Property } from "./property";
import { User } from "./user";
import { Booking } from "./booking";
import { DateRange } from "../value-objects/date-range";

describe("Property Entity", () => {
  it("deve criar uma instância de Property com todos os atributos", () => {
    const property = new Property(
      "1",
      "Casa de praia",
      "Uma bela cada na praia",
      4,
      200
    );

    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa de praia");
    expect(property.getDescription()).toBe("Uma bela cada na praia");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar um erro se o nome for vazio", () => {
    expect(() => new Property("1", "", "Descrição", 4, 500)).toThrow(
      "O nome é obrigatório"
    );
  });

  it("deve lançar um erro se o número máximo de hóspedes for zero ou negativo", () => {
    expect(() => new Property("1", "Casa", "Descrição", 0, 500)).toThrow(
      "O número máximo de hóspedes deve ser maior que zero"
    );
  });

  it("deve validar o número máximo de hóspedes", () => {
    const property = new Property("1", "Casa de campo", "Descrição", 5, 150);

    expect(() => {
      property.validateGuestCount(6);
    }).toThrow("Número máximo de hóspedes excedido. Máximo permitido é 5");
  });

  it("não deve aplicar aplicar desconto para estadias menores que sete noites", () => {
    const property = new Property("1", "Apartamento", "Descrição", 3, 100);
    const dateRange = new DateRange(
      new Date("2025-12-20"),
      new Date("2025-12-25")
    );

    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(500);
  });

  it("deve aplicar aplicar desconto para estadias de 7 noites ou mais", () => {
    const property = new Property("1", "Apartamento", "Descrição", 3, 100);
    const dateRange = new DateRange(
      new Date("2025-12-20"),
      new Date("2025-12-31")
    );

    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(990);
  });

  it("deve verificar disponibilidade", () => {
    const property = new Property("1", "Apartamento", "Descrição", 4, 200);
    const user = new User("1", "Maria Silva");
    const dateRange = new DateRange(
      new Date("2025-12-20"),
      new Date("2025-12-25")
    );

    const testDateRange = new DateRange(
      new Date("2025-12-22"),
      new Date("2025-12-31")
    );

    new Booking("1", property, user, dateRange, 2);

    expect(property.isAvailable(dateRange)).toBe(false);
    expect(property.isAvailable(testDateRange)).toBe(false);
  });
});
