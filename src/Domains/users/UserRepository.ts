import { RegisterUser } from './entities/RegisterUser';
import { RegisteredUser } from './entities/RegisteredUser';


abstract class UserRepository {
  /**
   * Verifies if a username is available in the repository.
   *
   * This method checks if a given username is already in use. If the username is not
   * available, an error should be thrown. Otherwise, it resolves without issues.
   *
   * @param {string} username - The username to be verified for availability.
   * @returns {Promise<void>} - A promise that resolves if the username is available.
   * @throws {Error} - Throws an error if the method is not implemented or if the username
   *                   is already taken.
   */
  abstract verifyAvailableUsername(username: string): Promise<void>;

  /**
   * Adds a new user to the repository.
   *
   * This method takes a `RegisterUser` object containing the user's registration data
   * and persists it to the repository. It returns a `RegisteredUser` object that represents
   * the newly created user.
   *
   * @param {RegisterUser} registerUser - The user registration data to be added to the repository.
   * @returns {Promise<RegisteredUser>} - A promise that resolves to the newly registered user.
   * @throws {Error} - Throws an error if the method is not implemented in a concrete class.
   */
  abstract addUser(registerUser: RegisterUser): Promise<RegisteredUser>;

  abstract getPasswordByUsername(username: string):  Promise<string>;

  abstract getIdByUsername(username: string): Promise<string>;
};

export default UserRepository;
