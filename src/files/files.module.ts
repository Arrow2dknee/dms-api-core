import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { FilesController } from './files.controller';
import { FILES_SERVICE_NAME, FILE_PACKAGE_NAME } from './file.pb';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5002',
          package: FILE_PACKAGE_NAME,
          protoPath: 'node_modules/dms-proto/proto/file.proto',
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [FilesController],
})
export class FilesModule {}
