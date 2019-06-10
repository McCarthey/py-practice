import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';

@Module({
  providers: [GoodsService],
  controllers: [GoodsController]
})
export class GoodsModule {}
