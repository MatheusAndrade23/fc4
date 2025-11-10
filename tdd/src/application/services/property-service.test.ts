import { PropertyService } from "./property-service";
import { FakePropertyRepository } from "../../infra/repositories/fake-property-repository";
import { Property } from "../../domain/entities/property";

describe("PropertyService", () => {
  let propertyService: PropertyService;
  let fakePropertyRepository: FakePropertyRepository;

  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    propertyService = new PropertyService(fakePropertyRepository);
  });

  it("deve retornar null quando um ID inválido for passado", async () => {
    const property = await propertyService.findPropertyById("111");

    expect(property).toBeNull();
  });

  it("deve retornar uma propriedade quando um id válido for fornecido", async () => {
    const property = await propertyService.findPropertyById("1");

    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("1");
    expect(property?.getName()).toBe("Apartamento");
  });

  it("deve salvar uma propriedade e depois buscá-la", async () => {
    const newProperty = new Property(
      "3",
      "Test Property",
      "Test Description",
      4,
      300
    );

    await fakePropertyRepository.save(newProperty);

    const property = await propertyService.findPropertyById("3");
    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("3");
  });
});
