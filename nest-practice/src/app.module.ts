import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { CategoriesModule } from './categories/categories.module';
import { GoodsModule } from './goods/goods.module';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

@Module({
  imports: [CatsModule, CategoriesModule, GoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
      ) /* 使用exclude()方法排除不应用middlewaare的路由，参数支持一个或多个指定了path，method的对象
        (注：exclude()无法应用于函数式中间件(用函数而不是类定义的中间件))
      */
      .forRoutes(CatsController); // forRoutes的参数接受：单一字符串，多字符串，RouteInfo对象，一个控制器类，多个控制器类（逗号连接）
  }
}
