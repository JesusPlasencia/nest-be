import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';

@Schema()
export class Role extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);