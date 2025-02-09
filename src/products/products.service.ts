import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dtos';
import { PaginationResponse, Response } from 'src/models/api';
import { Product } from '@prisma/client';
import { convertToSlug } from 'src/helpers';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createProductDto: CreateProductDto): Promise<Response<Product>> {
    const slug: string = convertToSlug(createProductDto.name);
    
    const productExists = await this.getProductBySlug(slug);

    const product: Product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        slug
      }
    });

    return {
      message: ' product created.',
      data: product
    }

  }

  async findAll(pagination: PaginationDto): Promise<PaginationResponse<Product[]>> {
    const {limit, page, orderBy} = pagination;

    const totalProducts = await this.prisma.product.count();
    const lastPage = Math.ceil(totalProducts / limit!);

    const products = await this.prisma.product.findMany({
      skip: (page - 1) * limit!,
      take: limit,
      orderBy: {
        updatedAt: orderBy,
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    return {
      message: 'product List successfull.',
      data: products,
      meta: {
        total: totalProducts,
        page,
        lastPage
      }
    }
  }

  async findOne(slug: string):Promise<Response<Product>> {

    const product = await this.getProductBySlug(slug);

    return {
      message: 'get product successfully',
      data: product
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Response<Product>> {
    const product = await this.getProductById(id);

    if (updateProductDto.name) {
      updateProductDto.slug = convertToSlug(updateProductDto.name);
    }

    const udpateProduct = await this.prisma.product.update({
      where: {id},
      data: updateProductDto
    });

    return {
      message: 'product updated',
      data: udpateProduct
    }
  }

  async remove(id: string): Promise<string> {
    const product = await this.getProductById(id);
    await this.prisma.product.delete({
      where: { id }
    })

    return `This action removes a #${id} product`;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id }
    })

    if (!product) {
      throw new NotFoundException(`Product not found by id: ${id}`);
    }

    return product;
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { slug }
    })

    if (!product) {
      throw new NotFoundException(`Product not found by slug: ${slug}`);
    }

    return product;
  }
}
