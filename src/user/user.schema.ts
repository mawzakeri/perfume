import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {IsBoolean, IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    @IsNotEmpty({message: 'لطفا نام کاربری را وارد کنید'})
    username: string;

    @Prop()
    @IsNotEmpty({message: 'لطفا رمزعبور را وارد کنید'})
    password: string;

    @Prop()
    @IsEmail({} , {message: 'لطفا ایمیل خود را با فرمت صحیح وارد نمائید'})
    email: string;

    @Prop()
    @IsBoolean()
    confirmed: boolean;

    @Prop()
    @IsNotEmpty()
    role: string;

    @Prop()
    @IsOptional()
    ben: boolean;

    @Prop()
    @IsNotEmpty({message: 'لطفا نام و نام خانوادگی را وارد کنید'})
    fullname: string;

    @Prop()
    @IsNotEmpty()
    followers: [];

    @Prop()
    @IsNotEmpty()
    following: [];

}

export const UserSchema = SchemaFactory.createForClass(User);
