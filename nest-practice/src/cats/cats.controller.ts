import { Controller, Get, Req, Post, HttpCode, Header } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  create(): string {
      return 'This action adds a new cat\n'
  }
  @Get()
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats\n'
  }
  @Get('ab*cd')
  findWildCat():string {
      return 'This route uses a wildcard\n'
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
