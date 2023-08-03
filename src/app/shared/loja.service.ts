import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from './serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  url:string = "https://localhost:7269/api/Product/"

  constructor(public http:HttpClient) { }

  listarProdutos():Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}listar-produtos`)
  }

  buscarProduto(id:number):Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}listar-produto/${id}`)
  }

  buscarProdutosPorCategoria(categoria:string):Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}listar-prod-categoria/${categoria}`)
  }
}
