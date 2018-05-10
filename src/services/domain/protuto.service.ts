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
}