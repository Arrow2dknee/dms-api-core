import { Controller, Inject, OnModuleInit, Body, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  FilesServiceClient,
  FILES_SERVICE_NAME,
  CreateFileRequest,
  CreateFileResponse,
} from './file.pb';

@Controller('file')
export class FilesController implements OnModuleInit {
  private fileService: FilesServiceClient;
  @Inject(FILES_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.fileService =
      this.client.getService<FilesServiceClient>(FILES_SERVICE_NAME);
  }

  @Post()
  async createNewFile(
    @Body() bodyDto: CreateFileRequest,
  ): Promise<Observable<CreateFileResponse>> {
    return this.fileService.createFile(bodyDto);
  }
}
