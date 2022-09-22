import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSummaryDTO, UpdateSummaryDTO } from "../dto/summary.dto";
import { Summary } from "../entity/summary.entity";

@Injectable()
export class SummaryService {

    constructor(@InjectModel(Summary.name) private summaryModel: Model<Summary>) { }

    async findAll() {
        return this.summaryModel.find().exec();
    }

    async findById(id: string) {
        const summary = await this.summaryModel.findById(id);
        if (!summary) {
            throw new NotFoundException("Summary Not Available.");
        }
        return summary;
    }

    async create(payload: CreateSummaryDTO) {
        let subtotal = payload.subtotal;
        console.log(subtotal);
        const newSummary = new this.summaryModel({
            subtotal,
            igv: subtotal * 0.18,
            total: subtotal * 1.18
        });
        return newSummary.save();
    }

    update(id: string, changes: UpdateSummaryDTO) {
        const summary = this.summaryModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!summary) {
            throw new NotFoundException(`Summary #${id} not Found.`);
        }
        return summary;
    }

    delete(id: string) {
        const summary = this.summaryModel.findByIdAndDelete(id);
        return summary;
    }

}
