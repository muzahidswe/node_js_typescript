import { Controller, Get, Param, Res } from '@nestjs/common';
import { StaticFileService } from './static-file.service';

@Controller('static-file')
export class StaticFileController {
  constructor(private readonly staticFileService: StaticFileService) {}

  @Get('/app-sync-file-assets')
  async findAll() {
    return await this.staticFileService.findAll();
  }

  @Get(':folder_name/:fileId')
    async serviceImage(@Param('fileId') fileId, @Param('folder_name') folder_name, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'uploads/'+ folder_name});
  }
}
