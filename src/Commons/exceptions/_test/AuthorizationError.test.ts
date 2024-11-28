import { describe, it, expect } from 'bun:test';

import ClientError from '../ClientError';
import AuthorizationError from '../AuthorizationError';

describe('AuthorizationError', () => {
  it('should create AuthorizationError correctly', () => {
    const authorizationError = new AuthorizationError('authorization error!');

    expect(authorizationError).toBeInstanceOf(ClientError);
    expect(authorizationError.status).toEqual(403);
    expect(authorizationError.message).toEqual('authorization error!');
    expect(authorizationError.name).toEqual('AuthorizationError');
  });
});
