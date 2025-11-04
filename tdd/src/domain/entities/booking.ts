import { DateRange } from "../value-objects/date-range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly user: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private status: "CONFIRMED" | "CANCELLED";
  private totalPrice: number;

  constructor(
    id: string,
    property: Property,
    user: User,
    dateRange: DateRange,
    guestCount: number
  ) {
    if (guestCount <= 0) {
      throw new Error("O número de hóspedes tem que ser maior que zero");
    }

    property.validateGuestCount(guestCount);

    if (!property.isAvailable(dateRange)) {
      throw new Error(
        "A propriedade não está disponível no período selecionado"
      );
    }

    this.id = id;
    this.property = property;
    this.user = user;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
    this.totalPrice = property.calculateTotalPrice(dateRange);
    this.status = "CONFIRMED";

    property.addBooking(this);
  }

  getId() {
    return this.id;
  }

  getProperty() {
    return this.property;
  }

  getUser() {
    return this.user;
  }

  getDateRange() {
    return this.dateRange;
  }

  getGuestCount() {
    return this.guestCount;
  }

  getStatus() {
    return this.status;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  cancel(currentDate: Date) {
    if (this.status === "CANCELLED") {
      throw new Error("A reserva já está cancelada!");
    }

    this.status = "CANCELLED";

    const checkInDate = this.dateRange.getStartDate();
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysUntilCheckIn > 7) {
      this.totalPrice = 0;
    } else if (daysUntilCheckIn > 0) {
      this.totalPrice *= 0.5;
    }
  }
}
