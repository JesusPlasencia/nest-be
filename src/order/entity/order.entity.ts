import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entity/user.entity";

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  delivery: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }], required: true })
  products: Types.Array<Product>

  @Prop({ type: Boolean, default: true, required: false })
  state: boolean;

  @Prop({ type: Date, default: new Date(), required: false })
  created: Date;

  @Prop({ type: Date, default: new Date(), required: false })
  modified: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);