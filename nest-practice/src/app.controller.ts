import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/**
 * 控制器层负责处理传入的请求，并返回对客户端的响应。
 * 路由机制控制那个库之气接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。
 * 创建一个基本的控制器，使用装饰器（装饰器将类与所需的元数据关联，是Nest能够创建路由映射，即将请求绑定到相应的控制器）
 */
