import {Controller, Get,Put, Post, Delete, Patch, Req} from "@nestjs/common";
import { of } from "rxjs";
// import { Request } from 'express';

@Controller("/album") //define routes
export class AlbumController{

    @Get()
    getPhoto(@Req() req: Request){
        return "Photo";
    }
}