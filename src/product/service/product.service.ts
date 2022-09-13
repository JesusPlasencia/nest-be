import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { CreateProductDTO } from "../dto/product.dto";

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "T-shirt",
      description: "The same description.",
      price: 166.0,
      stock: 0,
      image: "",
      state: true,
      created: new Date(),
      modified: new Date(),
    },
    {
      id: 2,
      name: "Pants",
      description: "The same description.",
      price: 240.0,
      stock: 10,
      image: "",
      state: true,
      created: new Date(),
      modified: new Date(),
    },
  ];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException("Product Not Available.");
    }
    return product;
  }

  create(payload: CreateProductDTO) {
    console.log(payload);
    let idArray = this.products.map((product) => {
      return product.id;
    });
    let newId = Math.max(...idArray) + 1;
    const newProduct: Product = {
      id: newId,
      name: payload.name,
      description: !payload.description ? "" : payload.description,
      price: payload.price,
      stock: payload.stock,
      image: !payload.image ? "" : payload.image,
      state: true,
      created: new Date(),
      modified: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    let foundProduct = this.findById(id);
    if (foundProduct) {
      let index = this.products.findIndex((product) => product.id === id);
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
      this.products = this.products.filter((item) => item.id !== id);
      return foundProduct;
    }
    return null;
  }
}
