import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Summary extends Document {

    @Prop({ required: true })
    subtotal: number;

    @Prop({ required: true })
    igv: number;

    @Prop({ required: true })
    total: number;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);