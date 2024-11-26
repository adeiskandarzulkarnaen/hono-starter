/* istanbul ignore file */

import { createContainer } from 'instances-container';

// external agency
import { password } from 'bun';
import prismaClient from '@infrastructures/database/prisma/prismaClient';


// service (repository, helper, manager, etc)
import UserRepositoryPrisma from '@infrastructures/repository/UserRepositoryPrisma';
import BunBCryptPasswordHash from '@infrastructures/security/BunBCryptPasswordHash';


// use case
import AddUserUseCase from '@applications/use_case/AddUserUseCase';
import UserRepository from '@domains/users/UserRepository';
import PasswordHash from '@applications/security/PasswordHash';


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
