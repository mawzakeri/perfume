import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {UserModule} from "./user/user.module";
import {AdminModule} from "./admin/admin.module";
import {BrandModule} from "./brand/brand.module";
import {ScentModule} from "./scent/scent.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/perfume'),
    AuthModule,
    UserModule,
    AdminModule,
    BrandModule,
    ScentModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Ensures the config is available globally
    }),
  ],
})
export class AppModule {}
