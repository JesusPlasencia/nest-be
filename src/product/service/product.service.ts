import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async findAll(params: FilterProductDTO) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }
      }

      return await this.productModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  async findAllCustom(params: FilterProductDTO) {
    const products = await this.findAll(params);
    const ables = products.filter(function (p) { return (p.state === true) });
    return ables;
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException("Product Not Available.");
    }
    return product;
  }

  create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id: string, changes: UpdateProductDTO) {
    const product = this.productModel.findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not Found.`);
    }
    return product;
  }

  delete(id: string) {
    const product = this.productModel.findByIdAndUpdate(id, { state: false }, { new: true }).exec();
    return product;
  }
}
