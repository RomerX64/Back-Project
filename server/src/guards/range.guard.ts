import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


function validateRange(request:Request){
    const range = request.headers['range']
    return range === 'admin' || range === 'seller'
}


@Injectable()
export class RangeGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateRange(request)
    }
}