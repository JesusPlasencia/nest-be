import { Injectable, NotFoundException } from "@nestjs/common";
import { Subcategory } from "../entity/subcategory.entity";
import { CreateSubcategoryDTO, UpdateSubcategoryDTO } from "../dto/subcategory.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SubcategoryService {

    constructor(@InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>) { }

    async findAll() {
        return this.subcategoryModel.find().exec();
    }

    async findById(id: string) {
        const subcategory = await this.subcategoryModel.findById(id);
        if (!subcategory) {
            throw new NotFoundException("Subcategory Not Available.");
        }
        return subcategory;
    }

    create(data: CreateSubcategoryDTO) {
        const newBrand = new this.subcategoryModel(data);
        return newBrand.save();
    }

    update(id: string, changes: UpdateSubcategoryDTO) {
        const subcategory = this.subcategoryModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!subcategory) {
            throw new NotFoundException(`Subcategory #${id} not Found.`);
        }
        return subcategory;
    }

    delete(id: string) {
        const subcategory = this.subcategoryModel.findByIdAndDelete(id);
        return subcategory;
    }
}
