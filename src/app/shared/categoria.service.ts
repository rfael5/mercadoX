import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from './serviceResponse';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = "https://localhost:7269/api/Category/"

  private mudancaRota!: Observable<string>
  
  constructor(public http:HttpClient, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.mudancaRota = new Observable<string>((observer) => {
      this.router.events.subscribe(
        (event) => {
          if(event instanceof NavigationEnd){
            observer.next(event.url);
          }
        });
    });
  }

  getMudancaRota():Observable<string> {
    return this.mudancaRota;
  }

  listarCategorias():Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}listar-categorias`)
  }

}
