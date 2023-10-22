import { Component } from '@angular/core';
import { CategoriaService } from './shared/categoria.service';
import { ServiceResponse } from './shared/serviceResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from './shared/loja.service';
import { CarrinhoService } from './shared/carrinho.service';
import { AutenticacaoService } from './shared/autenticacao.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerceX-front';

  categorias!:ServiceResponse;

  loading:boolean = false;
  sessao!:boolean;

  constructor(
    private categoriaService:CategoriaService,
    public carrinhoService:CarrinhoService,
    public authService:AutenticacaoService,
    private router:Router) {}

  ngOnInit():void {
    this.listarCategorias();
    //this.listarQtdProdutosCarrinho();
  }

  listarCategorias(){
    this.loading = true;
    this.categoriaService.listarCategorias().subscribe(
      (data) => {
        this.categorias = data;
        this.loading = false;
      }
    )
  }

  navegarParaPagina(pagina:string):void{
    this.router.navigate([`/produtos/${pagina}`]);
  }

  navegarPara(pagina:string):void{
    this.router.navigate([`${pagina}`]);
  }

  buscarQtdProdutosCarrinho(){
    this.carrinhoService.inicializarCarrinho()
    console.log(this.carrinhoService.qtdProdutosCarrinho);
  }

  listarQtdProdutosCarrinho(){
    this.carrinhoService.buscarProdutosUsuario().subscribe(
      () => this.carrinhoService.atualizarQtdCarrinho()
    );
  }

  checarSessao(){
    this.authService.isLoggedIn.pipe(
      tap((isLogged:boolean) => {
        if(isLogged){
          return true;
        }else {
          return false;
        }
      })
    )
  }

  logout(){
    this.authService.logout();
    this.carrinhoService.qtdProdutosCarrinho = 0
    this.router.navigate(['login']);
  }
}
