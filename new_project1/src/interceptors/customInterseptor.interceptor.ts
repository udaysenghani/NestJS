import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { timeStamp } from "console";
import { promises } from "dns";
import { Request } from "express";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {

    const request = context.switchToHttp().getRequest<Request>();

    console.log("Request caught by the interceptor");
    request.headers["accept-language"] = "fr";

    // const response = await next.handle(); // it invokes the controller
    // console.log(response);
    // return response;
    return next.handle().pipe(map((data)=> ({data, timeStamp : new Date()})));
  }
}
