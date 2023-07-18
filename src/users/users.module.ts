import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { USER_SERVICE_NAME, USER_PACKAGE_NAME } from './user.pb';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5001',
          package: USER_PACKAGE_NAME,
          protoPath: 'node_modules/dms-proto/proto/user.proto',
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
