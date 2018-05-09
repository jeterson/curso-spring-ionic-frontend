import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

import {Observable} from 'rxjs/Rx';
import { CiadadeDTO } from "../../models/cidade.dto";

@Injectable()
export class CidadeService{

    constructor(public http:HttpClient){

    }

    findAll(estadoId:string):Observable<CiadadeDTO[]>{
        return this.http.get<CiadadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }
}