import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


function isAdminValidate(req:Request){
    const range = req.headers['range']
    const password = req.headers['password']
    return range === 'admin' && password === 'admin'
}

@Injectable()
export class IsAdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return isAdminValidate(request)
    }
}