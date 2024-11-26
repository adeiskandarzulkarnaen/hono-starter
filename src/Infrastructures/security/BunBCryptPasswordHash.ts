import { Password } from "bun";
import AuthenticationError from "@commons/exceptions/AuthenticationError";
import PasswordHash from "@applications/security/PasswordHash";


type BunPasswordLib = {
  hash(password: string, algorithm?: Password.BCryptAlgorithm): Promise<string>
  verify(password: string, hash: string, algorithm?: Password.AlgorithmLabel): Promise<boolean>;
}


class BunBCryptPasswordHash extends PasswordHash {
  constructor(private readonly password: BunPasswordLib, private saltRound: number = 10) {
    super();
  }

  public async hash(plain: string): Promise<string> {
    const hashedPassword = await this.password.hash(plain, {
      algorithm: "bcrypt",
      cost: this.saltRound,
    });
    return hashedPassword;
  }

  public async comparePassword(plain: string, hashed: string): Promise<void> {
    const match = await this.password.verify(plain, hashed, "bcrypt");
    if (!match) throw new AuthenticationError('credendensial tidak sesuai');
  }
};

export default BunBCryptPasswordHash;
