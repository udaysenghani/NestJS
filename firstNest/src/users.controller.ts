
import { Controller, Get, Inject, Optional } from "@nestjs/common";
import { UsersStore } from "./store/users.store";

@Controller('/users')
export class UsersController {
    // constructor(private store: UsersStore) //is same as below
    // constructor(@optional() private store: any){ // used for the optional dependancy mean not necessary
    constructor(private store: UsersStore) {
        console.log(this.store);
    }
}