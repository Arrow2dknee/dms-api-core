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
  UseGuards,
  Request,
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
  GetFilesOfFolderRequest,
  GetFilesOfFolderResponse,
} from './file.pb';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../users/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
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
    @Request() req: any,
  ): Promise<Observable<CreateFileResponse>> {
    return this.fileService.createFile({
      ...bodyDto,
      userId: req.user,
    });
  }

  @Patch()
  async updatePath(
    @Body() bodyDto: UpdatePathRequest,
    @Request() req: any,
  ): Promise<Observable<UpdatePathResponse>> {
    return this.fileService.updateFilePath({ ...bodyDto, user: req.user });
  }

  @Get()
  async findFile(
    @Query() dto: FindOneRequest,
    @Request() req: any,
  ): Promise<Observable<FindOneResponse>> {
    return this.fileService.findOne({ name: dto.name, user: req.user });
  }

  @Get('/list')
  async findFiles(
    @Query() dto: PaginationDto,
    @Request() req: any,
  ): Promise<Observable<FindAllResponse>> {
    return this.fileService.findAll({
      ...dto,
      user: req.user,
    });
  }

  @Delete()
  async remove(
    @Query() dto: DeleteFileRequest,
    @Request() req: any,
  ): Promise<Observable<DeleteFileResponse>> {
    return this.fileService.deleteFile({ id: dto.id, user: req.user });
  }

  @Get('/folder')
  async filesInFolder(
    @Query() dto: GetFilesOfFolderRequest,
    @Request() req: any,
  ): Promise<Observable<GetFilesOfFolderResponse>> {
    return this.fileService.getFilesOfFolder({ ...dto, user: req.user });
  }
}
