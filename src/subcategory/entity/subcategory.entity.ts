import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/entity/category.entity';

@Schema()
export class Subcategory extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;

    @Prop({ type: Types.ObjectId, ref: Category.name })
    category: Category | Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);