import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { NestjsFormDataModule } from "nestjs-form-data";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.schema";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'), // Accessing JWT_SECRET from .env
              signOptions: { expiresIn: '30d' },
          }),
      }),
      NestjsFormDataModule.config({}),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}