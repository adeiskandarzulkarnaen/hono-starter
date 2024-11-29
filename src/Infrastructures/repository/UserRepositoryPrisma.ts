import { PrismaClient } from '@prisma/client';
import InvariantError from '@commons/exceptions/InvariantError';
import UserRepository from '@domains/users/UserRepository';
import { RegisterUser } from '@domains/users/entities/RegisterUser';
import { eRegisteredUser, RegisteredUser } from '@domains/users/entities/RegisteredUser';



class UserRepositoryPrisma extends UserRepository {
  constructor(private prismaClient: PrismaClient) {
    super();
  }

  public async verifyAvailableUsername(username: string): Promise<void> {
    const result = await this.prismaClient.user.findFirst({
      where: { username },
      select: { id : true }
    });
    if (result) throw new InvariantError('username tidak tersedia');
  }

  public async addUser(registerUser: RegisterUser): Promise<RegisteredUser> {
    const { username, password, fullname } = registerUser;

    const result: eRegisteredUser = await this.prismaClient.user.create({
      data: { username, password, fullname },
      select: { id: true, username: true, fullname: true }
    });

    return new RegisteredUser(result);
  }

  public async getPasswordByUsername(username: string): Promise<string> {
    const user = await this.prismaClient.user.findFirst({
      where: { username }, select: { password: true }
    });

    if (!user?.password) throw new InvariantError('username tidak ditemukan');
    return user.password;
  }

  public async getIdByUsername(username: string): Promise<string> {
    const user = await this.prismaClient.user.findFirst({
      where: { username }, select: { id: true }
    });

    if (!user?.id) throw new InvariantError('user tidak ditemukan');
    return user.id;
  }
}

export default UserRepositoryPrisma;
