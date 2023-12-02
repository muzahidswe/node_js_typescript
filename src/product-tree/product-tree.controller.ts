import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductTreeService } from './product-tree.service';
import { CreateProductTreeDto, GetProductTreeDto } from './dto/product-tree.dto';
import { UpdateProductTreeDto } from './dto/update-product-tree.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessGuard } from 'src/guards/access.guard';

// @UseGuards(AccessGuard)
@Controller('product-tree')
@UseGuards(JwtAuthGuard)
@ApiTags('Product-tree')
export class ProductTreeController {
  constructor(private readonly productTreeService: ProductTreeService) { }

  @Get()
  async getProductTree(@Query() query) {
    return await this.productTreeService.getProductTree(query);
  }

  @Get('list')
  async getList(@Query() query) {
    return await this.productTreeService.getList(query);
  }

  @Get('sku')
  async getSkuList(@Query() query) {
    return await this.productTreeService.getSkuList(query);
  }

  @Get()
  findAll() {
    return this.productTreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTreeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductTreeDto: UpdateProductTreeDto) {
    return this.productTreeService.update(+id, updateProductTreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTreeService.remove(+id);
  }
}
