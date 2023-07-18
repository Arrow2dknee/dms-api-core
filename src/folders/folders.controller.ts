import {
  Controller,
  UseGuards,
  Post,
  Put,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Request,
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
    @Request() req: any,
  ): Promise<Observable<CreateFolderResponse>> {
    return this.folderService.createFolder({ name: dto.name, user: req.user });
  }

  @Put()
  async updateName(
    @Body() dto: UpdateFolderNameRequest,
    @Request() req: any,
  ): Promise<Observable<UpdateFolderNameResponse>> {
    return this.folderService.updateFolderName({
      id: dto.id,
      name: dto.name,
      user: req.user,
    });
  }

  @Delete()
  async deleteFolder(
    @Body() dto: DeleteFolderRequest,
    @Request() req: any,
  ): Promise<Observable<DeleteFolderResponse>> {
    return this.folderService.deleteFolder({ id: dto.id, user: req.user });
  }
}
