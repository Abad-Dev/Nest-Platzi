import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/Products.dto';
import { Product } from 'src/entities/Product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: uuidv4(),
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

    findOne(id: string) {
        const product = this.products.find((item) => item.id == id);
        if (!product) {
            throw new NotFoundException("Product with id: " + id + " not found or it doesn't exists.");
        }
        return product
    }

    createProduct(payload: CreateProductDto) {

        this.products.push({
            id: uuidv4(),
            ...payload
        });
        return payload;
    }

    updateProduct(id: string, payload: UpdateProductDto) {
        const product = this.findOne(id);
        if (!product) {
            return false;
        }
        const index = this.products.findIndex(item => item.id == id);
        this.products[index] = {...product, ...payload}
        return this.products[index];
    }

    deleteProduct(id: string) {
        const product = this.findOne(id);
        if (!product) {
            return false;
        }
        const index = this.products.findIndex(item => item.id == id)
        this.products.splice(index, 1);
        return true;
    }
}
