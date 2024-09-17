import {Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import {IsNotEmpty} from "class-validator";
import { Document } from 'mongoose';

export type PerfumeDocument = Perfume & Document;

@Schema()
export class Perfume{

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

export const PerfumeSchema = SchemaFactory.createForClass(Perfume);



