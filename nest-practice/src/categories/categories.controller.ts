import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
