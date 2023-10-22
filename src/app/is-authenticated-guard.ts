import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AutenticacaoService } from "./shared/autenticacao.service";

@Injectable({
    providedIn: 'root'
})

export class IsAuthenticatedGuard implements CanActivate {

    constructor(private authService:AutenticacaoService, private router:Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):
        | Observable <boolean | UrlTree>
        | Promise <boolean | UrlTree>
        |boolean
        |UrlTree
    {
        // return this.authService.isLoggedIn.pipe(
        //     tap((isLoggedIn) => {
        //         if(!isLoggedIn){
        //             this.router.navigate(['login'])
        //         }
        //     })
        // );

        let token = localStorage.getItem('auth');

        if (token) {
            if (token == '' || token == null){
                this.router.navigate(['login']);
                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
    
}
