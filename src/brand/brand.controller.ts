import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFiles, BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BrandService } from './brand.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post('add')
    @UseInterceptors(
        FilesInterceptor('images', 2,   {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    // Create a unique filename
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new BadRequestException('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    async addBrand(
        @Body() body: any,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const { title, description } = body;

        let profile_image
        let banner_image

        if(files && files.length !== 0){
            profile_image = files[0]?.filename;
            banner_image = files[1]?.filename;
        }

        if (!profile_image || !banner_image) {
            throw new BadRequestException('عکس پروفایل و بنر برند الزامی است.');
        }

        if(!title)
            throw new BadRequestException('لطفا عنوان برند را ارسال نمائید.');

        if(!description)
            throw new BadRequestException('لطفا توضیحات برند را ارسال نمائید.');

        return this.brandService.addBrand(title, description, profile_image, banner_image);
    }
}
