import { Injectable } from "@nestjs/common";

interface User{
    name: string;
    age: number;
    id: number;
}

@Injectable() // the class is ready to use as dependancy
export class Store {
  private store = new Map<number, User>();


  constuctor(){
    console.log("store.ts");
  }
  addUser(user: User) {
    this.store.set(user.id, user);
  }

  getUser(id: number) {
    return this.store.get(id);
  }

  getUsers() {
    return Array.from(this.store).map((_, user) => user);
  }

  updateUser(id: number, user: User) {
    this.store.set(id, user);
  }

  deleteUser(id: number) {
    this.store.delete(id);
  }
}
