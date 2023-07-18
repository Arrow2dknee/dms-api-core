import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { FoldersController } from './folders.controller';
import { FOLDER_SERVICE_NAME, FOLDER_PACKAGE_NAME } from './folder.pb';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FOLDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5002',
          package: FOLDER_PACKAGE_NAME,
          protoPath: 'node_modules/dms-proto/proto/folder.proto',
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [FoldersController],
})
export class FoldersModule {}
