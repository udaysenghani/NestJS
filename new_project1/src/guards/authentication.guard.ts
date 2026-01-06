import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside AuthenticationGuard');

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;

    // 1️⃣ Check Authorization header
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // 2️⃣ Extract Bearer token
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    // 3️⃣ Verify token
    try {
      const decodedUser = this.jwtService.verify(token);
      request.user = decodedUser; // attach user to request
      console.log(request.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}
