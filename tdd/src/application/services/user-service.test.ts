import { UserService } from "./user-service";
import { FakeUserRepository } from "../../infra/repositories/fake-user-repository";
import { User } from "../../domain/entities/user";

describe("User Service", () => {
  let userService: UserService;
  let fakeUserRepository: FakeUserRepository;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    userService = new UserService(fakeUserRepository);
  });

  it("deve retornar null quando um id inválido for passado", async () => {
    const user = await userService.findById("10");

    expect(user).toBeNull();
  });

  it("deve retornar um usuário quando um id válido for fornecido", async () => {
    const user = await userService.findById("1");
    expect(user).toBeTruthy();
    expect(user?.getId()).toBe("1");
  });

  it("deve criar um usuário e depois buscá-lo", async () => {
    const user = new User("34", "John");
    await fakeUserRepository.create(user);

    const userFound = await userService.findById(user.getId());

    expect(userFound).toBe(user);
  });
});
