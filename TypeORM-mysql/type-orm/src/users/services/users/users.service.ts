import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from 'typeorm/entities/Users';

@Injectable()
export class UsersService {

    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

    findUsers() {
        return this.userRepository.find()
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails,createdAt: new Date()});
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams){
        return this.userRepository.update({id}, {...updateUserDetails});
    }

    deleteUser(id: number){
        return this.userRepository.delete(id);
    }
}
