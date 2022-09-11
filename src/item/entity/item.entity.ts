import { Order } from "src/order/entity/order.entity";
import { Product } from "src/product/entity/product.entity";

export class Item {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    amount: number;
    created: Date;
    modified: Date;
}