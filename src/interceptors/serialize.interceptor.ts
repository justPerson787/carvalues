import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";

interface ClassConctructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConctructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run sth before a request is handled
    //by the request handler
        console.log("running before the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                //run sth before response sent out
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,//removes properties not marked with @Expose at UserDto
                })
            })
        )
    }
}