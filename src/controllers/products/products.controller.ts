import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/Products.dto';
import { Product } from 'src/entities/Product.entity';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts() {
        return this.productsService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post()
    createProduct(@Body() payload: CreateProductDto) {
        return this.productsService.createProduct(payload);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() payload: UpdateProductDto) {
        return this.productsService.updateProduct(id, payload);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id);
    }
}
