import { HttpInterceptor, HttpRequest, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import {Observable} from 'rxjs/Rx'; 
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).catch((error, cauth) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor");
            console.log(errorObj);
            return Observable.throw(errorObj);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true,
}