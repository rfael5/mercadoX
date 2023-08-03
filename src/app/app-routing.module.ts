import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosCategoriaComponent } from './produtos-categoria/produtos-categoria.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'produtos/:pag', component:ProdutosCategoriaComponent},
  {path:'detalhes-produto/:id', component:DetalhesProdutoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
