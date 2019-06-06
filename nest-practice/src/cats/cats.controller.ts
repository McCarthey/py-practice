import { Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { create } from 'domain';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
      return 'This action adds a new cat\n'
  }
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats\n'
  }
}

/**
 * controller与装饰器的组合形成了路由，上述路由为 /cats
 */
