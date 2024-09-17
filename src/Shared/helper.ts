
import * as bcrypt from 'bcrypt';



export function trowError400Messages(entity , type = 'not-empty'){
    if(type === 'not-empty')
        return { ok: false , status: 400, message: ` لطفا ${entity} را وارد نمائید ` };
    else
        return { ok: false , status: 400, message: ` لطفا ${entity} را بدرستی وارد نمائید ` };
}

export function emailValidator(email){
    if(email){
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
}


const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export function extractTokenFromHeader(token: string): string | undefined {
    const [type, tokenConverted] = token?.split(' ') ?? [];
    return type === 'Bearer' ? tokenConverted : undefined;
}



