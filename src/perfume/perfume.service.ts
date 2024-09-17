import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfume, PerfumeSchema } from './perfume.schema';
import { Multer } from 'multer';

@Injectable()
export class PerfumeService
{
    constructor(
        @InjectModel(Perfume.name) private readonly perfumeModel: Model<PerfumeDocument>,
    ) {}

    async addPerfume(title: string, description: string, profile_image: string, banner_image: string): Promise<Perfume> {
        const newPerfume = new this.perfumeModel({
            title,
            description,
            profile_image,
            banner_image
        });

        return await newPerfume.save();
    }
}
