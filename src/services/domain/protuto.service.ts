import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ProdutoService{

    constructor(public http:HttpClient){}

    findByCategoria(categoria_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }
    findById(id:string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }

    getSmallImageFromBucket(id:string):Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType:'blob'});
    }

    getImageFromBucket(id:string):Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType:'blob'});
    }
}