import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [FilesModule, UsersModule, FoldersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
