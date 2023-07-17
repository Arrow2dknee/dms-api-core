import {
  Controller,
  Inject,
  OnModuleInit,
  Body,
  Post,
  Patch,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  FilesServiceClient,
  FILES_SERVICE_NAME,
  CreateFileRequest,
  CreateFileResponse,
  UpdatePathRequest,
  UpdatePathResponse,
  FindOneRequest,
  FindOneResponse,
  FindAllResponse,
  DeleteFileRequest,
  DeleteFileResponse,
} from './file.pb';
import { PaginationDto } from '../common/dto/pagination.dto';

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

  @Patch()
  async updatePath(
    @Body() bodyDto: UpdatePathRequest,
  ): Promise<Observable<UpdatePathResponse>> {
    return this.fileService.updateFilePath(bodyDto);
  }

  @Get()
  async findFile(
    @Query() dto: FindOneRequest,
  ): Promise<Observable<FindOneResponse>> {
    return this.fileService.findOne(dto);
  }

  @Get()
  async findFiles(
    @Query() dto: PaginationDto,
  ): Promise<Observable<FindAllResponse>> {
    return this.fileService.findAll({
      ...dto,
      user: null, // TODO: Update to logged-in user id
    });
  }

  @Delete()
  async remove(
    @Query() dto: DeleteFileRequest,
  ): Promise<Observable<DeleteFileResponse>> {
    return this.fileService.deleteFile(dto);
  }
}
