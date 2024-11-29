import { describe, it } from 'bun:test';


describe('BunBCryptPasswordHash', () => {
  describe('hash function', () => {
    it.todo('should encrypt password correctly');
  });

  describe('comparePassword function', () => {
    it.todo('should throw AuthenticationError if password not match');
    it.todo('should not return AuthenticationError if password match');
  });
});
