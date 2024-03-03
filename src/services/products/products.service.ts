import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/Products.dto';
import { Product } from 'src/entities/Product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Product 1',
            description: 'bla bla',
            price: 122,
            image: '',
            stock: 12,
        },
    ];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id == id);
        if (!product) {
            throw new NotFoundException("Product with id: " + id + " not found or it doesn't exists.");
        }
        return product
    }

    createProduct(payload: CreateProductDto) {
        this.products.push({...payload});
        return payload;
    }

    updateProduct(id: number, payload: UpdateProductDto) {
        const product = this.findOne(id);
        if (!product) {
            return false;
        }
        const index = this.products.findIndex(item => item.id == id);
        this.products[index] = {...product, ...payload}
        return this.products[index];
    }

    deleteProduct(id: number) {
        const product = this.findOne(id);
        if (!product) {
            return false;
        }
        const index = this.products.findIndex(item => item.id == id)
        this.products.splice(index, 1);
        return true;
    }
}
