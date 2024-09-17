import { Module } from '@nestjs/common';
import {NestjsFormDataModule} from "nestjs-form-data";
import {AdminService} from "./admin.service";
import {AdminController} from "./admin.controller";
import {UsersService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.schema";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        NestjsFormDataModule.config({}),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Accessing JWT_SECRET from .env
                signOptions: { expiresIn: '30d' },
            }),
        }),
    ],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}

