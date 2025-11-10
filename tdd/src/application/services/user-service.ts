import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(user: User): Promise<void> {
    return this.userRepository.create(user);
  }
}
