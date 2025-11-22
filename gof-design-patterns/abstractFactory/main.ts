interface Flight {
  origin: string;
  destination: string;
  airline: string;
  getDetails(): string;
}

interface Hotel {
  location: string;
  city: string;
  getDetails(): string;
}

interface Transfer {
  type: string;
  getDetails(): string;
}

class DomesticFlight implements Flight {
  constructor(
    public origin: string,
    public destination: string,
    public airline: string
  ) {}

  getDetails(): string {
    return `Domestic Flight from ${this.origin} to ${this.destination} by ${this.airline}`;
  }
}

class InternationalFlight implements Flight {
  constructor(
    public origin: string,
    public destination: string,
    public airline: string
  ) {}

  getDetails(): string {
    return `International Flight from ${this.origin} to ${this.destination} by ${this.airline}`;
  }
}

class DomesticHotel implements Hotel {
  constructor(public location: string, public city: string) {}

  getDetails(): string {
    return `Domestic Hotel at ${this.location}, ${this.city}`;
  }
}

class InternationalHotel implements Hotel {
  constructor(public location: string, public city: string) {}

  getDetails(): string {
    return `International Hotel at ${this.location}, ${this.city}`;
  }
}

class DomesticTransfer implements Transfer {
  constructor(public type: string) {}

  getDetails(): string {
    return `Domestic Transfer: ${this.type}`;
  }
}

class InternationalTransfer implements Transfer {
  constructor(public type: string) {}

  getDetails(): string {
    return `International Transfer: ${this.type}`;
  }
}

interface TravelPackageFactory {
  createFlight(origin: string, destination: string, airline: string): Flight;
  createHotel(location: string, city: string): Hotel;
  createTransfer(type: string): Transfer;
}

class DomesticTravelFactory implements TravelPackageFactory {
  createFlight(origin: string, destination: string, airline: string): Flight {
    return new DomesticFlight(origin, destination, airline);
  }

  createHotel(location: string, city: string): Hotel {
    return new DomesticHotel(location, city);
  }

  createTransfer(type: string): Transfer {
    return new DomesticTransfer(type);
  }
}

class InternationalTravelFactory implements TravelPackageFactory {
  createFlight(origin: string, destination: string, airline: string): Flight {
    return new InternationalFlight(origin, destination, airline);
  }

  createHotel(location: string, city: string): Hotel {
    return new InternationalHotel(location, city);
  }

  createTransfer(type: string): Transfer {
    return new InternationalTransfer(type);
  }
}

class BookingSystem {
  private factory: TravelPackageFactory;

  constructor(factory: TravelPackageFactory) {
    this.factory = factory;
  }

  createTravelPackage(
    origin: string,
    destination: string,
    airline: string,
    hotelCity: string,
    hotelLocation: string,
    transferType: string
  ) {
    const flight = this.factory.createFlight(origin, destination, airline);
    const hotel = this.factory.createHotel(hotelLocation, hotelCity);
    const transfer = this.factory.createTransfer(transferType);
  }
}

const domesticFactory = new DomesticTravelFactory();
const internationalFactory = new InternationalTravelFactory();

const domesticBookingSystem = new BookingSystem(domesticFactory);
const internationalBookingSystem = new BookingSystem(internationalFactory);

domesticBookingSystem.createTravelPackage(
  "São Paulo",
  "Rio de Janeiro",
  "Gol",
  "São Paulo",
  "Local Y",
  "Ônibus"
);

internationalBookingSystem.createTravelPackage(
  "São Paulo",
  "Espanha",
  "American Airlines",
  "Espanha X",
  "Local X",
  "Uber"
);
