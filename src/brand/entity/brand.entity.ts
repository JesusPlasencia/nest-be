import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: "", required: true })
    logo: string;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);