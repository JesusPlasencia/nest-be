import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entity/user.entity";

export class Order {
    id: number;
    user: User;
    address: string;
    delivery: Date;
    state: boolean;
    created: Date;
    modified: Date;
}