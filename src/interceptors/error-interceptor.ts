import { HttpInterceptor, HttpRequest, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessageDTO } from "../models/field-message.dto";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


    constructor(public storage: StorageService, public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).catch((error, cauth) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor");
            console.log(errorObj);

            switch (errorObj.status) {
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
            }
            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
    handle422(obj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Erro de Validação',
            message: this.listErrors(obj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();

    }

    listErrors(errors:FieldMessageDTO[]){
        let s:string = '';
        for(let m of errors){
            s = s + '<p><strong>'+m.fieldName + '</strong>: ' + m.message;
        }
        return s;
    }

    handle401(): any {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'Email ou Senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();

    }

    handleDefaultError(e) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + e.status + ': ' + e.error,
            message: e.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}