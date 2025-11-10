import { Repository } from "typeorm";
import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/PropertyRepository";
import { PropertyEntity } from "../persistence/property-entity";
import { PropertyMapper } from "../persistence/mappers/property-mapper";

export class TypeORMPropertyRepository implements PropertyRepository {
  constructor(private readonly repository: Repository<PropertyEntity>) {}

  async save(property: Property): Promise<void> {
    const entity = PropertyMapper.toPersistence(property);
    await this.repository.save(entity);
  }
  async findById(id: string): Promise<Property | null> {
    const entity = await this.repository.findOne({ where: { id } });

    if (entity === null) return null;

    return PropertyMapper.toDomain(entity);
  }
}
