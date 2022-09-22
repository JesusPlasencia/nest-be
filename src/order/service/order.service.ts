import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "../entity/order.entity";
import { CreateOrderDTO, UpdateOrderDTO } from "../dto/order.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Summary } from "src/summary/entity/summary.entity";
import { SummaryService } from "src/summary/service/summary.service";
import { Item } from "src/item/entity/item.entity";
import { CreateSummaryDTO, UpdateSummaryDTO } from "src/summary/dto/summary.dto";

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Item.name) private itemModel: Model<Item>,
        @InjectModel(Summary.name) private summaryModel: Model<Summary>,
        private summaryService: SummaryService,) { }

    async findAll() {
        return this.orderModel.find().populate(['user', 'items', 'summary']).exec();
    }

    async findAllCustom() {
        const orders = await this.findAll();
        const ables = orders.filter(function (o) { return (o.state === true) });
        return ables;
    }

    async findById(id: string) {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new NotFoundException("Order Not Available.");
        }
        return order;
    }

    async create(data: CreateOrderDTO) {
        const newOrder = new this.orderModel(data);
        return newOrder.save();
    }

    update(id: string, changes: UpdateOrderDTO) {
        const order = this.orderModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!order) {
            throw new NotFoundException(`Order #${id} not Found.`);
        }
        return order;
    }

    delete(id: string) {
        const product = this.orderModel.findByIdAndUpdate(id, { state: false }, { new: true }).exec();
        return product;
    }

    async removeItem(id: string, itemId: string, summary: UpdateSummaryDTO) {
        const order = await this.orderModel.findById(id);
        order.items.pull(itemId);
        await this.updateSummary(id, summary);
        return order.save();
    }

    async addItem(id: string, itemIds: string[], summary: UpdateSummaryDTO) {
        const order = await this.orderModel.findByIdAndUpdate(id,
            {
                $addToSet: { items: itemIds }
            });
        await this.updateSummary(id, summary);
        return order.save();
    }

    async updateSummary(id: string, summary: UpdateSummaryDTO) {
        const foundOrder = await this.orderModel.findById(id);
        let summaryId = foundOrder.summary.toString();
        foundOrder.items.forEach(async item => {
            const foundItem = await this.itemModel.findById(item);
            summary.subtotal = foundItem.amount;
        });
        this.summaryService.update(summaryId, summary);
    }

}
