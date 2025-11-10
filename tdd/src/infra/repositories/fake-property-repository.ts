import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/PropertyRepository";

export class FakePropertyRepository implements PropertyRepository {
  private properties: Property[] = [
    new Property("1", "Apartamento", "Apartamento Moderno", 4, 100),
    new Property("1", "Casa de Praia", "Casa com vista  para o mar", 6, 200),
  ];

  async save(property: Property): Promise<void> {
    this.properties.push(property);
  }

  async findById(id: string): Promise<Property | null> {
    return this.properties.find((property) => property.getId() === id) ?? null;
  }
}
