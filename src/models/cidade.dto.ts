import { EstadoDTO } from "./estado.dto";

export interface CiadadeDTO{
    id:string;
    nome:string;
    estado?:EstadoDTO;
}