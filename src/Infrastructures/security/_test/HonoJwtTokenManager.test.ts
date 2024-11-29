import { describe, it, expect } from 'bun:test';
import { sign, verify } from 'hono/jwt';
import HonoJwtTokenManager from '../HonoJwtTokenManager';
import InvariantError from '@commons/exceptions/InvariantError';



describe('HonoJwtTokenManager', () => {
  describe('generateAccessToken', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager({ sign, verify });
      const payload = {
        username: 'adeiskandarzulkarnaen',
        role: 'admin',
      };

      // Action
      const token = await honoJwtTokenManager.generateAccessToken(payload);

      // Assert
      expect(token).toBeString();
      expect(token).not.toBeEmpty();
    });
  });

  describe('verifyAccessToken', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager({ sign, verify });
      const token = 'invalid_token';

      // Action and Assert
      await expect(honoJwtTokenManager.verifyAccessToken(token))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when access token verified', async () =>{
      // Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager({ sign, verify });
      const payload = {
        username: 'adeiskandarzulkarnaen',
        role: 'admin',
      };

      // Action
      const token = await honoJwtTokenManager.generateAccessToken(payload);

      // Assert
      await expect(honoJwtTokenManager.verifyAccessToken(token))
        .resolves.not.toThrow(InvariantError);
    });
  });
});


