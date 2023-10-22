import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { CadastroUsuarioService } from '../shared/cadastro-usuario.service';
//import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { ModalErroSenhaComponent } from './modal-erro-senha/modal-erro-senha.component';
import { ModalMensagensComponent } from './modal-mensagens/modal-mensagens.component';

export interface DialogData {
  type:number,
  titulo: string,
  texto: string
}

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  cadastroUsuario!:FormGroup;
  novoUsuario!:User;

  get form(){
    return this.cadastroUsuario.controls;
  }

  constructor(
    private formBuilder:FormBuilder, 
    private cadastroService:CadastroUsuarioService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.cadastroUsuario = this.formBuilder.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(6)])],
      confirmPassword:['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(6)])]
    })
  };

  validarFormulario(){
    if (this.cadastroUsuario.invalid){
      console.log("Por favor, preencha todos os dados corretamente.");
    }else if(this.cadastroUsuario.get('password')?.value !== this.cadastroUsuario.get('confirmPassword')?.value){
      this.openDialog(2);
      //console.log("As senhas digitadas não conferem. Por favor, confirme sua senha.");
    }else{
      this.setarDadosUsuario();
    }
  }

  setarDadosUsuario(){
    this.novoUsuario = {
      email: this.cadastroUsuario.get('email')?.value,
      password: this.cadastroUsuario.get('password')?.value,
      confirmPassword: this.cadastroUsuario.get('confirmPassword')?.value,
    }

    this.cadastrarUsuario(this.novoUsuario);
  }

  cadastrarUsuario(usuario:User){
    this.cadastroService.cadastrarUsuario(usuario).subscribe(
      success => {this.openDialog(1)},
      error => {
        if(error.error.message.includes('Usuário já existe')){
          this.openDialog(3)
        }}
    );
  }

  // openDialog() {
  //   this.dialog.open(ModalErroSenhaComponent);
  // }

  openDialog(tipoModal:number) {
    if(tipoModal === 1){
      this.dialog.open(ModalMensagensComponent, {
        data: {
          type:1,
          titulo: 'Pronto',
          texto: 'Usuário cadastrado com sucesso'
        },
      });
    }
    else if(tipoModal === 2){
      this.dialog.open(ModalMensagensComponent, {
        data: {
          type:2,
          titulo: 'Erro ao confirmar senha',
          texto: 'As senhas digitadas não conferem. Por favor, confirme sua senha.'
        },
      });
    }
    else if(tipoModal === 3){
      this.dialog.open(ModalMensagensComponent, {
        data: {
          type:2,
          titulo: 'Usuário já existe',
          texto: 'O e-mail que você tentou cadastrar já consta no banco de dados.'
        },
      });
    }
  }

}
