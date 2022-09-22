import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Product } from 'src/product/entity/product.entity';

@Schema()
export class Item extends Document {

  @Prop({ type: Product, required: true })
  product: Product | Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: new Date(), required: true })
  created: Date;

  @Prop({ type: Date, default: new Date(), required: true })
  modified: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
