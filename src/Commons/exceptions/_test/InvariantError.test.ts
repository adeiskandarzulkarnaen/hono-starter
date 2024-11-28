import { describe, it, expect } from 'bun:test';

import ClientError from '../ClientError';
import InvariantError from '../InvariantError';

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error occurs');

    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError.status).toEqual(400);
    expect(invariantError.message).toEqual('an error occurs');
    expect(invariantError.name).toEqual('InvariantError');
  });
});
