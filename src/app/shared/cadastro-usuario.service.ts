import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  url = "https://localhost:7269/api/Auth/"

  constructor(private http:HttpClient) { }

  cadastrarUsuario(usuario:User):Observable<User>{
    return this.http.post<User>(`${this.url}register`, usuario);
  }
}
