import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../shared/autenticacao.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CarrinhoService } from '../shared/carrinho.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!:FormGroup;
  usuarioLogin:any;

  erroLogin:boolean = false;

  constructor(
    private formBuilder:FormBuilder, 
    public authService:AutenticacaoService,
    public carrinhoService:CarrinhoService,
    public router:Router) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.formularioLogin = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  setarDadosLogin(){
    this.usuarioLogin = {
      email: this.formularioLogin.get('email')?.value,
      password: this.formularioLogin.get('password')?.value
    }

    this.login(this.usuarioLogin);
  }

  login(usuario:any){
    this.authService.login(usuario).subscribe(
      (response) => {
        this.carrinhoService.atualizarQtdCarrinho();
        this.router.navigate(['home']);
        localStorage.setItem('user', response.data.userEmail);
        localStorage.setItem('userId', response.data.userNumber);
      },
      (error) => {
        this.erroLogin = true;
      }
    );
  }

}
