import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFiles, BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ScentService } from './scent.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('scent')
export class ScentController
{
    constructor(private readonly scentService: ScentService) {}

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
    async addScent(
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
            throw new BadRequestException('عکس پروفایل و بنر رایحه الزامی است.');
        }

        if(!title)
            throw new BadRequestException('لطفا عنوان رایحه را ارسال نمائید.');

        if(!description)
            throw new BadRequestException('لطفا توضیحات رایحه را ارسال نمائید.');

        return this.scentService.addScent(title, description, profile_image, banner_image);
    }
}
