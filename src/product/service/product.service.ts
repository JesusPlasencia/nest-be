import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
    private products: Product[] = [
        {
            id: 1,
            name: "T-shirt",
            description: "The same description.",
            price: 166.00,
            stock: 0,
            image: "",
        },
        {
            id: 2,
            name: "Pants",
            description: "The same description.",
            price: 240.00,
            stock: 10,
            image: ""
        }
    ];

    findAll() {
        return this.products;
    }

    findById(id: number) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException("Product Not Exist.");
        }
        return product;
    }

    create(payload: any) {
        let idArray = this.products.map(product => {
            return product.id;
        });
        let newId = Math.max(...idArray) + 1;
        const newProduct: Product = {
            id: newId,
            name: payload.name,
            description: "The same description added.",
            price: payload.price,
            stock: payload.stock,
            image: "",
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: any) {
        let foundProduct = this.findById(id);
        if (foundProduct) {
            let index = this.products.findIndex(product => product.id === id);
            this.products[index] = {
                ...foundProduct,
                ...payload,
            };
            return this.products[index];
        }
        return null;
    }

    delete(id: number) {
        let foundProduct = this.findById(id);
        if (foundProduct) {
            this.products = this.products.filter(item => item.id !== id);
            return foundProduct;
        }
        return null;
    }
}
