import { eUserLogin, UserLogin } from "@domains/users/entities/UserLogin";
import type UserRepository from "@domains/users/UserRepository";

interface UserLoginUseCaseDevedencies {
  userRepository: UserRepository
}

class UserLoginUseCase {
  private readonly userRepository;
  constructor({ userRepository }: UserLoginUseCaseDevedencies){
    this.userRepository = userRepository;
  }

  public async execute(payload: eUserLogin) {
    const { username, password } = new UserLogin(payload);

    // cari username di database jika tidak ada throw error
    // verifikasi password hashIng jika tidak sesuai throw error
    // buatkan access token dengan payload userId, username, role
    // kembalikan accessToken
  }
};

export default UserLoginUseCase;

