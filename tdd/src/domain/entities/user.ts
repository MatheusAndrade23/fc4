export class User {
  private readonly id: string;
  private readonly name: string;

  constructor(id: string, name: string) {
    if (!name) {
      throw new Error("O nome é obrigatório");
    }

    if (!id) {
      throw new Error("O id é obrigatório");
    }

    this.id = id;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
