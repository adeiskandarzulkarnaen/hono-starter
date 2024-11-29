import { eNewAuth, NewAuth } from "@domains/authentications/NewAuth";
import { eUserLogin, UserLogin } from "@domains/users/entities/UserLogin";
import type UserRepository from "@domains/users/UserRepository";
import type PasswordHash from "@applications/security/PasswordHash";
import type AuthenticationTokenManager from "@applications/security/AuthenticationTokenManager";

export interface UserLoginUseCaseDevedencies {
  userRepository: UserRepository
  passwordHash: PasswordHash,
  tokenManager: AuthenticationTokenManager,
}

export class UserLoginUseCase {
  private readonly userRepository;
  private readonly passwordHash;
  private readonly tokenManager;
  constructor({ userRepository, passwordHash, tokenManager }: UserLoginUseCaseDevedencies){
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.tokenManager = tokenManager;
  }

  public async execute(payload: eUserLogin): Promise<eNewAuth> {
    const { username, password } = new UserLogin(payload);

    const hashedPassword = await this.userRepository.getPasswordByUsername(username);
    await this.passwordHash.comparePassword(password, hashedPassword);
    const userId = await this.userRepository.getIdByUsername(username);
    const accessToken = await this.tokenManager.generateAccessToken({ userId, username })
    return new NewAuth({ accessToken });
  }
};

export default UserLoginUseCase;
