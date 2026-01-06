// import { Controller, Get, HttpStatus, HttpException, ForbiddenException, UseFilters, BadRequestException } from '@nestjs/common';
// import { AppService } from './app.service';
// import { error } from 'console';
// import { HttpExceptionFilter } from './exception-filter/http-exception.filter';


// @UseFilters(new HttpExceptionFilter) //controller level exception support
// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   @UseFilters(new HttpExceptionFilter) //method level exception support
//   getHello(): string {
//     throw new Error();
//     // throw new BadRequestException(); //from custom exception
//     // throw new ForbiddenException("custom message");
//     // throw new ForbiddenException({date: new Date()});
//     // throw new HttpException("This is an error..", HttpStatus.BAD_REQUEST)
//     // throw new HttpException({error: true, servertime: new Date(), message: "This is object type"},
//     // HttpStatus.BAD_REQUEST,
//     // {cause: error}
//     // );
//     return this.appService.getHello();
//   }
// }


//pipes

// import { Controller, Get, HttpStatus, HttpException, ForbiddenException, UseFilters, BadRequestException, UsePipes, Post, Body, Query, ConsoleLogger, ParseIntPipe } from '@nestjs/common';
// import { AppService } from './app.service';
// import { error } from 'console';
// import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
// import { MyFirstPipe } from './pipes/my-first-pipe';
// import { ToNumberPipe } from './pipes/tonumber-pipe';
// import { CustomerDto } from './pipes/dto/customer.dto';

// @Controller("/user")
// export class AppController {
//   constructor(private readonly appService: AppService) {}


  
//   @Get("/hello")
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Get("/pipe")
//   getallcustomer(@Query('limit', new ParseIntPipe({errorHttpStatusCode: 401 })) limit) {
//   // getallcustomer(@Query('limit', ParseIntPipe) limit) { //pipe
//   // getallcustomer(@Query('limit', ToNumberPipe) limit) { //pipe
//     console.log("The type is Limit is ", typeof(limit));
//     console.log(limit);
//     return limit;
//   }


//   // @UsePipes(MyFirstPipe) //it works for the both body data and query data
//   @Post()
//   createCustomer(@Body() body: CustomerDto){
//     console.log("in the Route handler Logic with body", body);
//     return body;
//   }
// }


//Guard
// import { Controller, Get, HttpStatus, HttpException, Post, Body, Query, ConsoleLogger, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
// import { AppService } from './app.service';
// import { CustomerDto } from './pipes/dto/customer.dto';
// import { AuthenticationGuard } from './guards/authentication.guard';
// import { AuthorizationGuard } from './guards/authorization.guard';
// import { Role } from './guards/decorators/roles.decorator';


// // @Role('admin')
// // @UseGuards(AuthenticationGuard, AuthorizationGuard) //controller level
// @Controller("/user")
// export class AppController {
//   constructor(private readonly appService: AppService) {}


//   // @UseGuards(AuthenticationGuard) //method level
//   @Get("/hello")
//   getHello(): string {
//     return this.appService.getHello();
//   }


//   @Role('admin')
//   @UseGuards(AuthenticationGuard, AuthorizationGuard)
//   @Get()
//   getallcustomer(@Req() {user}) { //data from jwt token
//     console.log(user);
//     return "hello";
//   }


//   // @UsePipes(MyFirstPipe) //it works for the both body data and query data
//   @Post()
//   createCustomer(@Body() body: CustomerDto){
//     console.log("in the Route handler Logic with body", body);
//     return body;
//   }
// }


//Interceptor

import { Controller, Get, HttpStatus, HttpException, Post, Body, Query, ConsoleLogger, ParseIntPipe, UseGuards, Req, UseInterceptors, Header, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomInterceptor } from './interceptors/customInterseptor.interceptor';

@UseInterceptors(CustomInterceptor)
@Controller("/user")
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @UseGuards(AuthenticationGuard) //method level
  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }


  // @Role('admin')
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @UseInterceptors(CustomInterceptor)
  @Get()
  getallcustomer(@Req() {user}, @Headers('accept-language') language) { //data from jwt token
    console.log(language);
    return [
      {
        name: "Jayesh",
        age: 35
      },
      {
        name: "Avinash",
        age: 30
      },
    ];
  }


  // @UseInterceptors(CustomInterceptor) //hendler level interceptor
  createCustomer(@Headers('accept-language') language){
    // console.log("in the Route handler Logic with body", body);
    console.log(language);
    return "hello";
  }
}