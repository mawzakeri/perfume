
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {extractTokenFromHeader} from "../Shared/helper";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = extractTokenFromHeader(request.headers?.authorization);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const userInfo = this.jwtService.verify(token);
            const user: any = await this.userModel.findById(userInfo.id).select("-__v") as CreateUserDto;
            console.log('user :' , user)
            if(user && user.role === 'admin'){
                return true
            }

        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}











