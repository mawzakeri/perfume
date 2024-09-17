import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../user/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    )
    {}

    async getUser(token: string){
        try {
            const userInfo = this.jwtService.verify(token);
            const user = await this.userModel.findById(userInfo.id).select("-__v") as CreateUserDto;
            if(user){
                user.password = undefined;
                return {
                    ok: true,
                    status: 200,
                    user: user
                }
            }
            else {
                return { ok: false , status: 401, message: "توکن احراز هویت باطل شده است" }
            }
        }
        catch(e){
            return { ok: false , status: 401, message: "توکن احراز هویت باطل شده است" }
        }
    }

}
