import { Secret } from './../node_modules/@types/jsonwebtoken/index.d';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global:true,
      secret : "SECREATE_KEY_gheijdkfvknffdolkgndfcgl",
      signOptions: {expiresIn: "60s"},
    }),//for guard
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
