import { Injectable, NotFoundException } from "@nestjs/common";
import { Customer } from "../entity/customer.entity";
import { CreateCustomerDTO, UpdateCustomerDTO } from "../dto/customer.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) { }

    async findAll() {
        return this.customerModel.find().populate('user').exec();
    }

    async findById(id: string) {
        const customer = await this.customerModel.findById(id);
        if (!customer) {
            throw new NotFoundException("Customer Not Available.");
        }
        return customer;
    }

    create(data: CreateCustomerDTO) {
        const newCustomer = new this.customerModel(data);
        return newCustomer.save();
    }

    update(id: string, changes: UpdateCustomerDTO) {
        const customer = this.customerModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not Found.`);
        }
        return customer;
    }

    delete(id: string) {
        const product = this.customerModel.findByIdAndDelete(id);
        return product;
    }
}
