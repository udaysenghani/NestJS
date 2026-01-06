import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MyFirstPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("hello");
        console.log(value);
        console.log(metadata);

        // throw new HttpException("errors.validationFailed", HttpStatus.BAD_REQUEST);
        return value;
    }
}