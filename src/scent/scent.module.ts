import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {NestjsFormDataModule} from "nestjs-form-data";
import {Scent, ScentSchema} from "./scent.schema";
import {ScentService} from "./scent.service";
import {ScentController} from "./scent.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Scent.name, schema: ScentSchema }]),
        NestjsFormDataModule.config({}),
    ],
    providers: [ScentService],
    controllers: [ScentController],
    exports: [ScentService],
})
export class ScentModule
{}
