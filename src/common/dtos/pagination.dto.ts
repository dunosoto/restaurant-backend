import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";


export enum PaginationOrder {
  DESC = 'desc',
  ASC = 'asc'
}

export class PaginationDto {
  
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsPositive()
  @IsOptional()
  orderBy?: PaginationOrder = PaginationOrder.DESC
}