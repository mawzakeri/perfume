import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {User, UserDocument} from "../user/user.schema";
import {AdminGuard} from "./admin.guard";

@Injectable()
@UseGuards(AdminGuard)
export class AdminService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    )
    {}

    async setRole(req){
        if(req && req?.body?.id && (req.body.role === 'user' || req.body.role === 'admin')){
            const targetUserId = req.body.id;
            if(mongoose.isValidObjectId(targetUserId)){
                const user: any = await this.userModel.findById(targetUserId);
                if(user && user.role){
                    user.role = req?.body?.role;
                    user.save();
                    return { ok: true , status: 201 , message: `${req.body.role === 'user' ? 'کاربر' : 'ادمین'} با موفقیت انتخاب شد ` }
                }
            }
            else {
                return { ok: false , status: 401 , message: 'کاربر یافت نشد' }
            }
        }
        else {
            return { ok: false , status: 401 , message: 'کاربر یافت نشد' }
        }
    }

}
