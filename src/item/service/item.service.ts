import { Injectable, NotFoundException } from "@nestjs/common";
import { Item } from "../entity/item.entity";
import { CreateItemDTO, UpdateItemDTO } from "../dto/item.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/product/entity/product.entity";

@Injectable()
export class ItemService {

    constructor(@InjectModel(Item.name) private itemModel: Model<Item>, @InjectModel(Product.name) private productModel: Model<Product>) { }

    async findAll() {
        return this.itemModel.find().exec();
    }

    async findById(id: string) {
        const item = await this.itemModel.findById(id);
        if (!item) {
            throw new NotFoundException("Item Not Available.");
        }
        return item;
    }

    async create(data: CreateItemDTO) {
        const newBrand = new this.itemModel(data);
        const foundProduct = await this.productModel.findById(newBrand.product);
        newBrand.amount = foundProduct?.price * newBrand.quantity;
        return newBrand.save();
    }

    update(id: string, changes: UpdateItemDTO) {
        const item = this.itemModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Item #${id} not Found.`);
        }
        return item;
    }

    delete(id: string) {
        const subcategory = this.itemModel.findByIdAndDelete(id);
        return subcategory;
    }

}
