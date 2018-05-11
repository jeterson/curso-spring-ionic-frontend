import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService, public imageUtilService:ImageUtilService) {

    }

    findByEmail(email: string): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(obj: ClienteDTO): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, { observe: 'response', responseType: 'text' });
    }

    findById(cliente_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${cliente_id}`)
    }

    uploadPicture(picture){
        let pcitureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData:FormData = new FormData();
        formData.set('file', pcitureBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {observe:'response', responseType:'text'});
    }
}