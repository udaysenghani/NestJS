import { Controller, Get, Post , Put, Delete, Body, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto";

let USERS: CreateUserDTO[] = [];

@Controller('/users')
export class UsersController{
    @Post()
    addUser(@Body() createUserDta: CreateUserDTO){
        USERS.push(createUserDta);
        return {
            message: "User added Sucessfully",
            user: createUserDta,
        };
    }

    @Get()
    getAllUser(){
        console.log(USERS);
        return USERS;
    }

    @Get("/:id")
    getUser(@Param('id') id: number){
        return USERS.find(user => user.id ===id);
    }

    @Put("/:id")
    UpdateUser(@Param('id') id: number, @Body() updateUserDTO : CreateUserDTO){
        const userID = USERS.findIndex(user => +user.id ===+id);
        if(!userID){
            return "No User Found";
        }
        else{
            USERS[userID] = updateUserDTO;
            return "Success";
        }
    }

    @Delete("/:id")
    DeleteUser(@Param('id') id: number){
        const userID = USERS.findIndex(user => +user.id ===+id);
        if(!userID){
            return "No User Found";
        }
        else{
           USERS = USERS.filter(user => +user.id !== +id);
            return "deleted";
        }
    }
}


// //Sub-Domain routing Host config 
// import { Controller, Get, HostParam } from "@nestjs/common";
// Controller({path : "/user", host: ":app:domain.com"})

// export class UsersController {
//     @Get()
//     getUsers(@HostParam('domain') params: Record<string, any>){
//         return "hello world"
//     }
// }

// //Ip config
// import { Controller, Get, HostParam , Ip} from "@nestjs/common";

// @Controller("/users")
// export class UsersController {
//     @Get()
//     getUsers(@Ip() ip: string){
//         console.log(ip);
//         return "hello world";
//     }
// }