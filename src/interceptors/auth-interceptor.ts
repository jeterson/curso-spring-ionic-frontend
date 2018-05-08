import { HttpInterceptor, HttpRequest, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import {Observable} from 'rxjs/Rx'; 
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public storage:StorageService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       
        let localUser = this.storage.getLocalUser();
        let n = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0,n) == API_CONFIG.baseUrl;
        if(localUser && requestToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
        
    }
}

export const AuthInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,
}