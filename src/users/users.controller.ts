import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,Response, Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessGuard } from 'src/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('master-entry/users')
@UseGuards(AccessGuard)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-password-policy-details')
  async get_ff_list(@Req() request) { 
    const sbu_id= request.query.sbu_id;    
    return await this.usersService.getPasswordPolicyDetails(sbu_id);
  }

  @Post('change-password')
  async create(@Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.usersService.changePassword(updatePasswordDto);
  }
  /*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  */
  @Get('get_user_dump')
  async painter_dump(@Response({ passthrough: true }) res: Response): Promise<any> {
    let data = this.usersService.getPainterDump(res);
    return data;
    // console.log(data);
  }
}
