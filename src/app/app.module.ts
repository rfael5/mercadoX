import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosCategoriaComponent } from './produtos-categoria/produtos-categoria.component';
import { CardProdutoComponent } from './card-produto/card-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampoPesquisaComponent } from './campo-pesquisa/campo-pesquisa.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalErroSenhaComponent } from './cadastrar-usuario/modal-erro-senha/modal-erro-senha.component';
import { ModalMensagensComponent } from './cadastrar-usuario/modal-mensagens/modal-mensagens.component';
import { LoginComponent } from './login/login.component';
import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';
import { AuthenticationInterceptor } from './shared/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    DetalhesProdutoComponent,
    ProdutosCategoriaComponent,
    CardProdutoComponent,
    CampoPesquisaComponent,
    CarrinhoComponent,
    CadastrarUsuarioComponent,
    ModalErroSenhaComponent,
    ModalMensagensComponent,
    LoginComponent,
    PaginaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
