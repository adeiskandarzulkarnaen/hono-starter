import { eRegisteredUser } from "@domains/users/entities/RegisteredUser";
import { eRegisterUser, RegisterUser } from "@domains/users/entities/RegisterUser";
import UserRepository from "@domains/users/UserRepository";
import PasswordHash from "@applications/security/PasswordHash";


interface AddUserUseCaseDevedencies {
  userRepository: UserRepository,
  passwordHash: PasswordHash,
}


class AddUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly passwordHash : PasswordHash;
  constructor({ userRepository, passwordHash }: AddUserUseCaseDevedencies){
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  public async execute(useCasePayload: eRegisterUser): Promise<eRegisteredUser> {
    const registerUser = new RegisterUser(useCasePayload);
    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHash.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
};

export default AddUserUseCase;
