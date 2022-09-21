import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Brand } from '../../brand/entity/brand.entity'
import { Subcategory } from 'src/subcategory/entity/subcategory.entity';

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

  @Prop({ type: Types.ObjectId, ref: Subcategory.name })
  subcategory: Subcategory | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// ProductSchema.index({ price: 1, stock: -1 });