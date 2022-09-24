import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Role } from 'src/role/entity/role.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Boolean, default: true, required: false })
  state: boolean;

  @Prop({ type: Date, default: new Date(), required: false })
  created: Date;

  @Prop({ type: Date, default: new Date(), required: false })
  modified: Date;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: Role | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);