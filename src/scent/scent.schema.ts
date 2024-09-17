import {Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import {IsNotEmpty} from "class-validator";
import { Document } from 'mongoose';

export type ScentDocument = Scent & Document;

@Schema()
export class Scent{

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

export const ScentSchema = SchemaFactory.createForClass(Scent);



