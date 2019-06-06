import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Header,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  @Get()
  @Header('Cache-Control', 'none')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
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
