/* istanbul ignore file */

import { createContainer } from 'instances-container';

// external agency
import { password } from "bun";
import { sign, verify } from 'hono/jwt';
import prismaClient from '@infrastructures/database/prisma/prismaClient';


// service (repository, helper, manager, etc)
import UserRepositoryPrisma from '@infrastructures/repository/UserRepositoryPrisma';
import BunBCryptPasswordHash from '@infrastructures/security/BunBCryptPasswordHash';
import HonoJwtTokenManager from '@infrastructures/security/HonoJwtTokenManager';


// use case
import AddUserUseCase from '@applications/use_case/AddUserUseCase';
import UserRepository from '@domains/users/UserRepository';
import PasswordHash from '@applications/security/PasswordHash';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';


// creating container
const container = createContainer();


// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPrisma,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: prismaClient }
      ]
    }
  },
  {
    key: PasswordHash.name,
    Class: BunBCryptPasswordHash,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: password }
      ]
    }
  },
  {
    key: AuthenticationTokenManager.name,
    Class: HonoJwtTokenManager,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: { sign, verify } }
      ]
    }
  }
]);


// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
      ]
    }
  },
]);


export default container;
