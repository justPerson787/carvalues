import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/users/auth.service';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'gfgf@gmail.com', password: 'qwer' } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'gfgfg' } as User])
      }
    };
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findAllUsers return a list of users with given email', async () => {
    const users = await controller.findAllUsers('qwer@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('qwer@gmail.com');
  });

  it('findUser returns a single user with given id', async () => {
    const users = await controller.findUser('1');
    expect(users).toBeDefined;
  });

  it('signin updates session object and returns user', async () => {
    const session = {userId: -10 };
    const user = await controller.signin(
      { email: 'aa@gg.com', password: 'lll' },
      session
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  });
  
});
