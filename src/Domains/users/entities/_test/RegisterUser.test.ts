import { describe, it, expect } from 'bun:test';
import { eRegisterUser, RegisterUser } from '../RegisterUser';

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'adeiskandarzulkarnaen',
      password: 'secretpassword',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });


  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 'adeiskandarzulkarnaen',
      fullname: true,
      password: 123,
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload: eRegisterUser = {
      username: 'adeiskandarzulkarnaenadeiskandarzulkarnaenadeiskandarzulkarnaen',
      fullname: 'Ade Iskandar Zulkarnaen',
      password: 'secretpassword',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });


  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload: eRegisterUser = {
      username: 'ade iskandar',
      fullname: 'Ade Iskandar Zulkarnaen',
      password: 'secret',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });


  it('should create registerUser object correctly', () => {
    // Arrange
    const payload: eRegisterUser = {
      username: 'adeiskandarzulkarnaen',
      fullname: 'Ade Iskandar Zulkarnaen',
      password: 'secretpassword',
    };

    // Action
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
