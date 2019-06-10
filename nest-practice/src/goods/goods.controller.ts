import { Controller, Get, Param } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.goodsService.findOne(id);
  }

  @Get('search')
  async search() {
    return this.goodsService.search();
  }
}
