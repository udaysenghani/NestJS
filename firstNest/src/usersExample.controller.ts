import { request } from 'http';
import { id, name } from './../node_modules/ci-info/index.d';
// import { UsersController } from './users.controller';
// import {Controller, 
//     Get,
//     Put, 
//     Post, 
//     Delete, 
//     Patch, 
//     Req, 
//     HttpCode , 
//     HttpStatus, 
//     Res,
//     Header,
//     Redirect
//     } from "@nestjs/common";
// import { of } from "rxjs";
// import type { Request, Response } from "express";

// @Controller("/users") //define routes
// export class UsersController{


//     @Header("Cache-control","no-store")
//     @Header('X-Name','Uday')
//     @Post("/profile")
//     @Redirect("/users/account", 302) //codde maters to which type of redirection reesource move permenent etc
//     @HttpCode(HttpStatus.OK)
//     getProfile(@Req() req: Request, @Res({passthrough: true}) res:Response){ //order not matters
//         // return of({
//         //     hello: "world",
//         // })
//         // res.status(200);
//         // res.json({
//         //     message : "hello",
//         // });
//         // return {
//         //     hello: "world",
//         // };
//         //if we are use the passthrough : true we can send response through return
//         const v = Math.floor(Math.random()*10) +1;
//         if (v<5){
//             return{
//                 url: "/users/account",
//                 statusCode: 302,
//             }
//         }
//         else{
//              return{
//                 url: "/users/wallet",
//                 statusCode: 302,
//             }
//         }
//     }


//     //method
//     @Get('/account')
//     accountRoute(){
//         return "Working Account";
//     }
//     @Get('/wallet')
//     walletRoute(){
//         return "Working wallet";
//     }
// }


// // return new Promise((resolve,reject)=>{
//         //     resolve({
//         //         hello: "world",
//         //     });
//         // });
//         // console.log(req.params);

//path parameter

// import { Controller, Get, Param } from "@nestjs/common";   

// interface Videoparams{
//     id: number;
//     name: string;
// }

// @Controller('/users')
// export class UsersController{
//     @Get("/videos/:id/:name")
//     // getvideos(@Param() params: Record<string, any>){
//     //getvideos(@Param('id') params: number){
//     getvideos(@Param() params: Videoparams){
//         console.log(params.id);
//         console.log(params.name);
//         return params;
//     }
// }

//query parameter

// import { Controller, Get, Query } from "@nestjs/common";   

// interface Videoquery{
//     name: string;
//     age: number;
// }

// @Controller('/users')
// export class UsersController{
//     @Get("/videos")
//     // 
//     getvideos(@Query() query: Videoquery){
//     //getvideos(@Query() query: Record<string, any>){
//     //getvideos(@Query('name') query: string){
//         console.log(query);
//         return query;
//     }
// }

//Header access
// import { Controller, Get, Headers  } from "@nestjs/common";   

// interface headers{
//     name: string;
//     age: number;
// }

// @Controller('/users')
// export class UsersController{
//     @Get("/videos")
//     // 
//     getHeaders(@Headers() headers: string){
//     // getHeaders(@Headers() headers: Record<string, any>){
//     // getHeaders(@Headers('user-agent') headers:string){
//        console.log(headers);
//        return headers; 
//     }
// }


//Body data Access
// import { Controller, Post, Body} from "@nestjs/common";

// interface VideoDTO{ //data transfer object
//     name : string,
//     age : number
// }

// @Controller('/users')
// export class UsersController{
//     @Post('/video')
//     // addvideo(@Body('name') requestData: string){
//     addvideo(@Body() requestData: VideoDTO){
//     // addvideo(@Body() requestData: Record <string, any>){
//         console.log(requestData);
//         return requestData;
//     }
// }