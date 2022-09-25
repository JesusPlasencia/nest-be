import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/role.dto";
import { Role } from "../entity/role.entity";

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }

    async findAll() {
        return this.roleModel.find().exec();
    }

    async findById(id: string) {
        const role = await this.roleModel.findById(id).exec();
        if (!role) {
            throw new NotFoundException("Role Not Available.");
        }
        return role;
    }

    create(data: CreateRoleDTO) {
        const newRole = new this.roleModel(data);
        return newRole.save();
    }

    update(id: string, changes: UpdateRoleDTO) {
        const role = this.roleModel.findByIdAndUpdate(id, {
            $set: {
                changes,
                modified: new Date()
            }
        }, { new: true })
            .exec();
        if (!role) {
            throw new NotFoundException(`Role #${id} not Found.`);
        }
        return role;
    }

    delete(id: string) {
        const role = this.roleModel.findByIdAndDelete(id);
        return role;
    }

}
