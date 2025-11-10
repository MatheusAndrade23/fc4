import { PropertyEntity } from "../persistence/property-entity";
import { UserEntity } from "../persistence/user-entity";
import { Property } from "../../domain/entities/property";
import { DataSource, Repository } from "typeorm";
import { TypeORMPropertyRepository } from "./typeorm-property-repository";
import { BookingEntity } from "../persistence/booking-entity";

describe("", () => {
  let dataSource: DataSource;
  let propertyRepository: TypeORMPropertyRepository;
  let repository: Repository<PropertyEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, UserEntity, BookingEntity],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();
    repository = dataSource.getRepository(PropertyEntity);
    propertyRepository = new TypeORMPropertyRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar uma propriedade", async () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Visita para o mar",
      6,
      200
    );

    await propertyRepository.save(property);
    const savedProperty = await repository.findOne({ where: { id: "1" } });
    expect(savedProperty).not.toBe(null);
    expect(savedProperty?.id).toBe("1");
  });

  it("deve retornar uma propriedade com ID valido", async () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Vista para o mar",
      6,
      200
    );
    await propertyRepository.save(property);

    const savedProperty = await propertyRepository.findById("1");
    expect(savedProperty).not.toBeNull();
    expect(savedProperty?.getId()).toBe("1");
    expect(savedProperty?.getName()).toBe("Casa na Praia");
  });

  it("deve retornar null ao buscar uma propriedade inexistente", async () => {
    const property = await propertyRepository.findById("999");
    expect(property).toBeNull();
  });
});
