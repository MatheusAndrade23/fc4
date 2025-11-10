import { Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../persistence/user-entity";
import { User } from "../../domain/entities/user";
import { UserMapper } from "../persistence/mappers/user-mapper";

export class TypeORMUserRepository implements UserRepository {
  constructor(private readonly repository: Repository<UserEntity>) {}
  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });

    if (entity === null) return null;

    return UserMapper.toDomain(entity);
  }
  async create(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.repository.save(entity);
  }
}
