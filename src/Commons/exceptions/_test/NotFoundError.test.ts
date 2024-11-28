import { describe, it, expect } from 'bun:test';

import ClientError from '../ClientError';
import NotFoundError from '../NotFoundError';

describe('NotFoundError', () => {
  it('should create error correctly', () => {
    const notFoundError = new NotFoundError('not found!');

    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError.message).toEqual('not found!');
    expect(notFoundError.status).toEqual(404);
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
