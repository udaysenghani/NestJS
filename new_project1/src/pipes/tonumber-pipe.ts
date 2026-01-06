import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ToNumberPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("The Value is ",value);
        console.log("The metadata type is",metadata.type);
        console.log("The metadata data is",metadata.data);
        return Number(value);
    }
}