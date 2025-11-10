import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/user-entity";
import { TypeORMUserRepository } from "./typeorm-user-repository";

describe("TypeORMUserRepository", () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeORMUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar um usuário", async () => {
    const user = new User("1", "John Doe");

    await userRepository.create(user);

    const savedUser = await repository.findOne({ where: { id: "1" } });

    expect(savedUser).not.toBeNull();
    expect(savedUser?.id).toBe("1");
  });

  it("deve retornar um usuário quando um id válido for fornecido", async () => {
    const user = new User("1", "John Doe");

    await userRepository.create(user);

    const savedUser = await userRepository.findById("1");

    expect(savedUser).not.toBeNull();
    expect(savedUser?.getId()).toBe("1");
  });

  it("deve retornar um null ao buscar um usuário inexistente", async () => {
    const savedUser = await userRepository.findById("112");

    expect(savedUser).toBeNull();
  });
});
