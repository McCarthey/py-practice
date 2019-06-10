import { Injectable } from '@nestjs/common';
import dubbo from '../common/dubbo/dubbo';

@Injectable()
export class GoodsService {
  async findOne(id: string) {
    return await dubbo.service.GoodsService.get(id);
  }
  async search() {
    return await dubbo.service.GoodsService.search()
  }
}
