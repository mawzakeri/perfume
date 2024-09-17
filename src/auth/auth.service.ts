import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/user.schema";
import { validate } from 'class-validator';
import {Model} from "mongoose";

import {plainToClass} from "class-transformer";
import {comparePasswords, emailValidator, hashPassword, trowError400Messages} from "../Shared/helper";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async register(createUserDto: CreateUserDto): Promise<any> {
        if(createUserDto.username){
            if(createUserDto.fullname){
                if(emailValidator(createUserDto.email)){

                   if(createUserDto.password){

                       const hashedPassword = await hashPassword(createUserDto.password);

                       const createdUser = new this.userModel({
                           username: createUserDto.username,
                           fullname: createUserDto.fullname,
                           email: createUserDto.email,
                           password: hashedPassword, // hashed password
                           confirmed: true,
                           ben: false,
                           role: 'user',
                           followers: [],
                           following: []
                       });

                       const token = this.jwtService.sign({username: createdUser.username , id: createdUser._id});

                       createdUser.save();

                       return {
                           ok: true,
                           status: 201,
                           message: 'با موفقیت ثبت نام شدید',
                           user: createdUser,
                           token
                       }
                   }
                   else {
                       return trowError400Messages("رمزعبور")
                   }

                }
                else {
                    return trowError400Messages("ایمیل" , 'email')
                }
            }
            else {
                return trowError400Messages("نام و نام خانوادگی")
            }
        }
        else {
            return trowError400Messages("نام کاربری")
        }

    }

    async login(data: {username: string, password: string}): Promise<any> {
        if(data.username){
            if(data.password){

                const user = await this.userModel.findOne({ username: data.username }).select('-__v') as any;

                if(user){
                    const passwordValidation = await comparePasswords(data.password , user.password)
                    if(passwordValidation){
                        user.password = undefined;
                        const token = this.jwtService.sign({username: user.username , id: user._id});
                        return {
                            ok: true,
                            message: "با موفقیت وارد شدید",
                            user: user,
                            token
                        }
                    }
                    else {
                        return { ok: false , status: 401, message: "لطفا رمزعبور خود را بدرستی وارد نمائید" }
                    }
                }
                else {
                    return { ok: false , status: 401, message: "کاربری با این نام کاربری ثبت نشده است" }
                }


/*                return {
                    ok: true,
                    status: 201,
                    message: 'با موفقیت ثبت نام شدید',
                    user: createdUser,
                    token
                }*/

            }
            else {
                return trowError400Messages("رمزعبور")
            }
        }
        else {
            return trowError400Messages("نام کاربری")
        }

    }

}