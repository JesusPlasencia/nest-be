import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: "", required: false })
  description: string;

  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ default: "", required: false })
  image: string;

  @Prop({ type: Boolean, default: true, required: false })
  state: boolean;

  @Prop({ type: Date, default: new Date(), required: false })
  created: Date;

  @Prop({ type: Date, default: new Date(), required: false })
  modified: Date;

  @Prop(raw({
    name: { type: String }
  }))
  subcategory: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// ProductSchema.index({ price: 1, stock: -1 });