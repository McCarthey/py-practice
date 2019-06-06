import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Header,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';
@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat\n';
  }
  @Get()
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats with webpack\n';
  }
  @Get('ab*cd')
  findByWildcard(): string {
    return 'This route uses a wildcard\n';
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return `This action updates a #${id} cat`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

/**
 * controller与装饰器的组合形成了路由，上述路由为 /cats
 * 通过curl测试：
 *      get: curl http://localhost:3000/cats
 *      post: curl -d {} http://localhost:3000/cats
 *
 * 通配符路由为 /cats/ab123cd
 */
