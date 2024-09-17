import {Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import {IsNotEmpty} from "class-validator";
import { Document } from 'mongoose';
import {User} from "../user/user.schema";

export type BrandDocument = Brand & Document;

@Schema()
export class Brand{

    @IsNotEmpty()
    @Prop()
    title: string;

    @IsNotEmpty()
    @Prop()
    description: string;

    @IsNotEmpty()
    @Prop()
    profile_image: string;

    @IsNotEmpty()
    @Prop()
    banner_image: string;

}

export const BrandSchema = SchemaFactory.createForClass(Brand);



