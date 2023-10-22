import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosCategoriaComponent } from './produtos-categoria/produtos-categoria.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './login/login.component';
import { IsAuthenticatedGuard } from './is-authenticated-guard';
import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomeComponent, canActivate: [IsAuthenticatedGuard]},
  {path:'produtos/:pag', component:ProdutosCategoriaComponent, canActivate: [IsAuthenticatedGuard]},
  {path:'detalhes-produto/:id', component:DetalhesProdutoComponent, canActivate: [IsAuthenticatedGuard]},
  {path:'carrinho', component:CarrinhoComponent, canActivate: [IsAuthenticatedGuard]},
  {path:'perfil', component:PaginaUsuarioComponent, canActivate: [IsAuthenticatedGuard]},
  {path:'cadastrar-usuario', component:CadastrarUsuarioComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
