import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "../entity/order.entity";
import { CreateOrderDTO, UpdateOrderDTO } from "../dto/order.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async findAll() {
        return this.orderModel.find().populate(['user', 'products']).exec();
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

    create(data: CreateOrderDTO) {
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

    async removeProduct(id: string, productId: string) {
        const order = await this.orderModel.findById(id);
        order.products.pull(productId);
        return order.save();
    }

    async addProduct(id: string, productIds: string[]) {
        const order = await this.orderModel.findByIdAndUpdate(id,
            {
                $addToSet: { products: productIds }
            });
        return order.save();
    }

}
