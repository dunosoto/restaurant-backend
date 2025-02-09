import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/models/api';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create({name, description}: CreateCategoryDto):Promise<Response<Category>> {
    const categoryExists = await this.prismaService.category.findFirst({
      where: { name }
    });

    if (categoryExists) {
      throw new BadRequestException('The category is already exits.');
    }

    const category: Category = await this.prismaService.category.create({
      data: { name, slug: name, description}
    });

    return {
      message: 'Category created successfully',
      data: category
    }
  }

  async findAll(): Promise<Response<Category[]>> {
    const categories: Category[] = await this.prismaService.category.findMany();

    return {
      message: 'category list',
      data: categories
    }
  }

  async findOne(id: string): Promise<Response<Category>> {
    
    const category: Category | null =  await this.prismaService.category.findFirst({
      where: { id }
      //include: products
    });

    if (!category) {
      throw new BadRequestException(`Category with id: ${id} not found`);
    }

    return {
      message: 'get category',
      data: category
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Response<Category>> {

    await this.findOne(id);

    const categoryUpdated: Category = await this.prismaService.category.update({
      where: {id},
      data: updateCategoryDto
    });

    return {
      message: 'Category updated.',
      data: categoryUpdated
    }
  }


  async remove(id: string): Promise<string> {

    const {data} = await this.findOne(id);
    await this.prismaService.category.delete({
      where: { id }
    });

    return 'Category was deleted.';
  }
}
