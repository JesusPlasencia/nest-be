import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../dto/category.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    async findAll() {
        return this.categoryModel.find().exec();
    }

    async findById(id: string) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new NotFoundException("Category Not Available.");
        }
        return category;
    }

    async findAllCustom() {
        const categories = await this.findAll();
        const ables = categories.filter(function (c) { return (c.state === true) });
        return ables;
    }

    create(data: CreateCategoryDTO) {
        const newCategory = new this.categoryModel(data);
        return newCategory.save();
    }

    update(id: string, changes: UpdateCategoryDTO) {
        const category = this.categoryModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!category) {
            throw new NotFoundException(`Category #${id} not Found.`);
        }
        return category;
    }

    delete(id: string) {
        const category = this.categoryModel.findByIdAndUpdate(id, { state: false }, { new: true }).exec();
        return category;
    }

}
