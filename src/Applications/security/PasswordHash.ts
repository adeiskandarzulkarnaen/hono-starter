abstract class PasswordHash {
  abstract hash(plain: string): Promise<string>;
  abstract comparePassword(plain: string, encrypted: string): Promise<void>;
};

export default PasswordHash;
