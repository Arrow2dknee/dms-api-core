import { Controller, OnModuleInit, Inject, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  USER_SERVICE_NAME,
  UserServiceClient,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './user.pb';

@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Post('/register')
  async register(
    @Body() dto: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.userService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.userService.login(dto);
  }
}
