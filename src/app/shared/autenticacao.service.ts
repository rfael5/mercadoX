import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  url = "https://localhost:7269/api/Auth/"

  constructor(private http:HttpClient) {
    // const token = localStorage.getItem('auth');
    // this._isLoggedIn.next(!!token);
  }

  login(usuario:any):Observable<any>{
    return this.http.post<any>(`${this.url}login`, usuario).pipe(
      tap((response) => {
        localStorage.setItem('auth', response.data.token)
        this._isLoggedIn.next(true);
      })
    )
    //.shareReplay()
  }

  mudarSenha(novaSenha:any):Observable<any>{
    return this.http.post<any>(`${this.url}change-password`, novaSenha);
  }

  logout(){
    localStorage.removeItem('auth');
  }

  validarSessao():boolean{
    const token = localStorage.getItem('auth')
    if(token){
      return true;
    }else {
      return false;
    }
  }
}
