import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ default: "", required: true })
    icon: string;

    @Prop({ type: Boolean, default: true, required: false })
    state: boolean;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;

}

export const CategorySchema = SchemaFactory.createForClass(Category);