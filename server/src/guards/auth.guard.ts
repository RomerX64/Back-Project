import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";




@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly jwtService:JwtService
    ){}
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const  request = context.switchToHttp().getRequest() 

        const token = request.headers['authorization']?.split()[1]??'';
        try {

        if(!token)throw new UnauthorizedException('Bearer token not found')
        const secret = process.env.JWT_SECRET

        const payLoad =  this.jwtService.verify(token, {secret})
        
        payLoad.range = ['admin']
        request.user = payLoad

        return true
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new UnauthorizedException('Invalid token')
        }
    }
}