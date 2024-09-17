import {Body, Controller, HttpException, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {FormDataRequest} from "nestjs-form-data";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { FastifyRequest } from 'fastify';
import {extractTokenFromHeader} from "../Shared/helper";


@Controller('auth')
@FormDataRequest()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Req() req: FastifyRequest) {
        const data = req.body as CreateUserDto;
        const response: any = this.authService.register(data);
        return response
    }

    @Post('login')
    login(@Req() req: FastifyRequest) {
        const data = req.body as { username: string, password: string };
        const response = this.authService.login(data);
        return response
    }


}