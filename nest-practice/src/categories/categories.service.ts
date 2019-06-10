import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import dubbo from '../common/dubbo/dubbo';

@Injectable()
export class CategoriesService {
  async findAll(): Promise<Category[]> {
    return await dubbo.service.CategoryService.list();
  }
}
