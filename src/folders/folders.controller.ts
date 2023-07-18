import {
  Controller,
  UseGuards,
  Post,
  Put,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { AuthGuard } from '../users/auth.guard';
import {
  FolderServiceClient,
  FOLDER_SERVICE_NAME,
  CreateFolderRequest,
  CreateFolderResponse,
  UpdateFolderNameRequest,
  UpdateFolderNameResponse,
  DeleteFolderRequest,
  DeleteFolderResponse,
} from './folder.pb';

@Controller('folders')
@UseGuards(AuthGuard)
export class FoldersController implements OnModuleInit {
  private folderService: FolderServiceClient;
  @Inject(FOLDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.folderService =
      this.client.getService<FolderServiceClient>(FOLDER_SERVICE_NAME);
  }

  @Post()
  async createNewFolder(
    @Body() dto: CreateFolderRequest,
  ): Promise<Observable<CreateFolderResponse>> {
    return this.folderService.createFolder(dto);
  }

  @Put()
  async updateName(
    dto: UpdateFolderNameRequest,
  ): Promise<Observable<UpdateFolderNameResponse>> {
    return this.folderService.updateFolderName(dto);
  }

  @Delete()
  async deleteFolder(
    @Query() dto: DeleteFolderRequest,
  ): Promise<Observable<DeleteFolderResponse>> {
    return this.folderService.deleteFolder(dto);
  }
}
