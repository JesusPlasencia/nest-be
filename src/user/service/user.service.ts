import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async findAll() {
    return this.userModel.find().populate('role').exec();
  }

  async findAllCustom() {
    const products = await this.findAll();
    const ables = products.filter(function (p) { return (p.state === true) });
    return ables;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("User Not Available.");
    }
    return user;
  }

  create(data: CreateUserDTO) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  update(id: string, changes: UpdateUserDTO) {
    const user = this.userModel.findByIdAndUpdate(id, {
      $set: {
        changes,
        modified: new Date()
      }
    }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not Found.`);
    }
    return user;
  }

  delete(id: string) {
    const user = this.userModel.findByIdAndUpdate(id, { state: false }, { new: true }).exec();
    return user;
  }
}
