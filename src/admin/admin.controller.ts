import {Body, Controller, Get, Post, Req} from '@nestjs/common';

import {FormDataRequest} from "nestjs-form-data";
import { FastifyRequest } from 'fastify';
import {AdminService} from "./admin.service";


@Controller('admin')
@FormDataRequest()
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('set_admin')
    async setRole(@Req() req: FastifyRequest) {
        const res = await this.adminService.setRole(req);
        return res
    }


}