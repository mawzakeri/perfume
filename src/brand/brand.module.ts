import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {NestjsFormDataModule} from "nestjs-form-data";
import {Brand, BrandSchema} from "./brand.schema";
import {BrandService} from "./brand.service";
import {BrandController} from "./brand.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
        NestjsFormDataModule.config({}),
    ],
    providers: [BrandService],
    controllers: [BrandController],
    exports: [BrandService],
})
export class BrandModule{}
