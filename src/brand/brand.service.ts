import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brand.schema';
import { Multer } from 'multer';

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand.name) private readonly brandModel: Model<BrandDocument>,
    ) {}

    async addBrand(title: string, description: string, profile_image: string, banner_image: string): Promise<Brand> {
        const newBrand = new this.brandModel({
            title,
            description,
            profile_image,
            banner_image
        });

        return await newBrand.save();
    }
}
