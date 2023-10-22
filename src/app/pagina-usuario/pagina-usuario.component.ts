import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../shared/autenticacao.service';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css']
})
export class PaginaUsuarioComponent implements OnInit {

  nomeUsuario:any;

  formMudarSenha!:FormGroup;

  erroConfirmacaoSenha:boolean = false;
  erroValidacaoSenha:boolean = false;
  
  constructor(private formBuilder:FormBuilder, private authService:AutenticacaoService) {}
  
  ngOnInit(): void {
    this.nomeUsuario = localStorage.getItem('user');
    this.criarFormulario();
  }

  criarFormulario(){
    this.formMudarSenha = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(6)])],
      confirmNewPassword: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(6)])]
    })
  }

  validarFormulario(){
    if(this.formMudarSenha.invalid){
      this.erroValidacaoSenha = true;
      console.log("Por favor, preencha todos os dados corretamente!")
    }else if(this.formMudarSenha.get('newPassword')?.value !== this.formMudarSenha.get('confirmNewPassword')?.value){
      this.erroConfirmacaoSenha = true;
    }else{
      const novaSenha = this.formMudarSenha.get('newPassword')?.value
      this.mudarSenha(novaSenha);
    }
  }

  mudarSenha(novaSenha:any){
    let senha = {
      password: this.formMudarSenha.get('newPassword')?.value,
      confirmPassword: this.formMudarSenha.get('confirmNewPassword')?.value
    }
    this.authService.mudarSenha(senha).subscribe();
  }



}
