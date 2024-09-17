import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scent, ScentDocument } from './scent.schema';
import { Multer } from 'multer';

@Injectable()
export class ScentService
{
    constructor(
        @InjectModel(Scent.name) private readonly scentModel: Model<ScentDocument>,
    ) {}

    async addScent(title: string, description: string, profile_image: string, banner_image: string): Promise<Scent> {
        const newScent = new this.scentModel({
            title,
            description,
            profile_image,
            banner_image
        });

        return await newScent.save();
    }
}
