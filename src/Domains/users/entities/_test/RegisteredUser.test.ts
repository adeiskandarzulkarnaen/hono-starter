import { describe, it, expect } from 'bun:test';
import { eRegisteredUser, RegisteredUser } from '../RegisteredUser';


describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'adeiskandarzulkarnaen',
      fullname: 'Ade Iskandar Zulkarnaen',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });


  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'adeiskandarzulkarnaen',
      fullname: 'Ade Iskandar Zulkarnaen',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrow('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload: eRegisteredUser = {
      id: 'user-123',
      username: 'adeiskandarzulkarnaen',
      fullname: 'Ade Iskandar Zulkarnaen',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
