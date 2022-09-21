import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.entity';

@Schema()
export class Customer extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    dni: string;

    @Prop({ type: Date, default: new Date(), required: false })
    created: Date;

    @Prop({ type: Date, default: new Date(), required: false })
    modified: Date;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User | Types.ObjectId;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);