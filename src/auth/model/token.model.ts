import { Types } from "mongoose";

export interface PayloadToken {
    role: Types.ObjectId;
    sub: number;
}