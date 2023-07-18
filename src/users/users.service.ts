import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  UserServiceClient,
  USER_SERVICE_NAME,
  ValidateUserResponse,
} from './user.pb';

@Injectable()
export class UsersService {
  private userService: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateUserResponse> {
    return firstValueFrom(this.userService.validateUser({ token }));
  }
}
