import { UsersService } from './../../services/users/users.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/Update.dto';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){}

    @Get()
    async getUsers(){
        const users = await this.UsersService.findUsers();
        return users;
    }   

    @Post()
    createUser(@Body() createuserdto: CreateUserDto){
        console.log("request");
        return this.UsersService.createUser(createuserdto);
    }

    @Put(':id')
    async updateUserById(@Param('id',ParseIntPipe) id: number, @Body() updateUserdto : UpdateUserDto){
        await this.UsersService.updateUser(id,updateUserdto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id : number){
        console.log("delete request ");
        await this.UsersService.deleteUser(id);
    }
}
