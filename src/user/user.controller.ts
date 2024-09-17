import {Body, Controller, Get, Post, Req} from '@nestjs/common';

import {FormDataRequest} from "nestjs-form-data";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { FastifyRequest } from 'fastify';
import {extractTokenFromHeader} from "../Shared/helper";
import {UsersService} from "./user.service";


@Controller('user')
@FormDataRequest()
export class UserController {
    constructor(private userService: UsersService) {}

    @Get('info')
    getUser(@Req() req: FastifyRequest) {
        const token = extractTokenFromHeader(req.headers.authorization);
        if(token){
            const response = this.userService.getUser(token);
            return response
        }
        return {ok: false , status: 401}
    }


}