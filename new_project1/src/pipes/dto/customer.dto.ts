import { IsInt, IsString } from "class-validator";


export class CustomerDto{
    @IsString()
    name: string;

    @IsInt()
    age: number;
}