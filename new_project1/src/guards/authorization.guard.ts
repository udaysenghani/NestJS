import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./decorators/roles.decorator";
// import { request } from "express";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredroles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getClass(),
            context.getHandler(),
        ]);
        console.log('the required role are', requiredroles);

       const request = context.switchToHttp().getRequest();
        const userrole = request.user.role;
        if(requiredroles !== userrole){ return false;}
        return true;
        console.log("Inside authorization guard");
        return true;
    }
}