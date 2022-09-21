import { Injectable, NotFoundException } from "@nestjs/common";
import { Brand } from "../entity/brand.entity";
import { CreateBrandDTO, UpdateBrandDTO } from "../dto/brand.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BrandService {

    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) { }

    async findAll() {
        return this.brandModel.find().exec();
    }

    async findById(id: string) {
        const brand = await this.brandModel.findById(id);
        if (!brand) {
            throw new NotFoundException("Brand Not Available.");
        }
        return brand;
    }

    create(data: CreateBrandDTO) {
        const newBrand = new this.brandModel(data);
        return newBrand.save();
    }

    update(id: string, changes: UpdateBrandDTO) {
        const brand = this.brandModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not Found.`);
        }
        return brand;
    }

    delete(id: string) {
        const brand = this.brandModel.findByIdAndDelete(id);
        return brand;
    }

}
