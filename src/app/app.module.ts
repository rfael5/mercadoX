import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosCategoriaComponent } from './produtos-categoria/produtos-categoria.component';
import { CardProdutoComponent } from './card-produto/card-produto.component';
import { FormsModule } from '@angular/forms';
import { CampoPesquisaComponent } from './campo-pesquisa/campo-pesquisa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    DetalhesProdutoComponent,
    ProdutosCategoriaComponent,
    CardProdutoComponent,
    CampoPesquisaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
