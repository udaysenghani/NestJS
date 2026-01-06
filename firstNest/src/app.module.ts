import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller"
import { AlbumController } from "./albums.controller";
import { UsersStore } from './store/users.store';
import { Store } from './store/store';


@Module({
  controllers: [UsersController, AlbumController],
  providers: [{ provide: UsersStore, useClass: Store }]
  // providers: [UsersStore]; short syntax saame as above if both name is same
  //{name, which class} register
})
export class AppModule { }
