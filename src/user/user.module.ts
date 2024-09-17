import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {User , UserSchema} from './user.schema';
import { UsersService } from './user.service';
import {NestjsFormDataModule} from "nestjs-form-data";
import {JwtModule} from "@nestjs/jwt";
import {UserController} from "./user.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        NestjsFormDataModule.config({}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Accessing JWT_SECRET from .env
                signOptions: { expiresIn: '30d' },
            }),
        }),
    ],
    providers: [UsersService],
    controllers: [UserController],
    exports: [UsersService],
})
export class UserModule {}
