import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { User } from "../entity/user.entity";
import { CreateUserDTO, EmailDTO, UpdateUserDTO } from "../dto/user.dto";
import { Model } from 'mongoose'

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

  async findUserByEmail(bodyEmail: EmailDTO) {
    const { email } = bodyEmail;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User Not Found.");
    }
    return user;
  }

  async create(data: CreateUserDTO) {
    const newUser = new this.userModel(data);
    const hashPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPass;
    //Excluir la password del response
    const model = await newUser.save();
    const { password, ...response } = model.toJSON();
    return response;
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
