import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {NestjsFormDataModule} from "nestjs-form-data";
import {Scent, PerfumeSchema} from "./scent.schema";
import {PerfumeService} from "./scent.service";
import {PerfumeController} from "./scent.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Scent.name, schema: PerfumeSchema }]),
        NestjsFormDataModule.config({}),
    ],
    providers: [PerfumeService],
    controllers: [PerfumeController],
    exports: [PerfumeService],
})
export class PerfumeModule
{}
