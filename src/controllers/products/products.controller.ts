import { Body, Controller, Param, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Post()
    createProduct(@Body() payload: any) {
        return {
            message: "Creation action",
            body: payload
        }
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() payload: any) {
        return {
            id,
            body: payload
        }
    }
}
