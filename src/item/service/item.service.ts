import { Injectable, NotFoundException } from "@nestjs/common";
import { Item } from "../entity/item.entity";
import { CreateItemDTO, UpdateItemDTO } from "../dto/item.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ItemService {

    constructor(@InjectModel(Item.name) private itemModel: Model<Item>) { }

    async findAll() {
        return this.itemModel.find().populate('product').exec();
    }

    async findById(id: string) {
        const item = await this.itemModel.findById(id).populate('product');
        if (!item) {
            throw new NotFoundException("Item Not Available.");
        }
        return item;
    }

    create(data: CreateItemDTO) {
        const newBrand = new this.itemModel(data);
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
