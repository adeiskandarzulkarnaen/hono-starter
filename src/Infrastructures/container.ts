/* istanbul ignore file */
import { createContainer } from 'instances-container';

// external agency
import prismaClient from '@infrastructures/database/prismaClient';


// abstrack class
import UserRepository from '@domains/users/UserRepository';
import PasswordHash from '@applications/security/PasswordHash';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';


// service (repository, helper, manager, etc)
import UserRepositoryPrisma from '@infrastructures/repository/UserRepositoryPrisma';
import BunBCryptPasswordHash from '@infrastructures/security/BunBCryptPasswordHash';
import HonoJwtTokenManager from '@infrastructures/security/HonoJwtTokenManager';


// use case
import { AddUserUseCase } from '@applications/use_case/AddUserUseCase';
import { UserLoginUseCase } from '@applications/use_case/UserLoginUseCase';


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
  },
  {
    key: AuthenticationTokenManager.name,
    Class: HonoJwtTokenManager,
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
  {
    key: UserLoginUseCase.name,
    Class: UserLoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
        { name: 'tokenManager', internal: AuthenticationTokenManager.name },
      ]
    }
  }
]);


export default container;
