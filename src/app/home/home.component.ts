import { Component, OnInit } from '@angular/core';
import { LojaService } from '../shared/loja.service';
import { Route, Router } from '@angular/router';
import { ServiceResponse } from '../shared/serviceResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos!:ServiceResponse;

  produtosFiltrados:any;
  
  loading:boolean = false;

  precoMinimo!:any;
  variantesProdutos!:any;

  pesquisa:string = '';

  constructor(private service:LojaService, private router:Router) { }

  ngOnInit(): void {
    this.listarProdutos()
  }

  listarProdutos(){
    this.loading = true;
    this.service.listarProdutos().subscribe(
      (data) => {
        this.produtos = data;
        this.produtosFiltrados = data;
        this.loading = false;
      }
    )
  }

  goToProduct(id:number){
    this.router.navigate([`detalhes-produto/${id}`])
  }

  pegarPrecoMinimo(tiposProduto:any){
    if(tiposProduto.length == 0){
      return null;
    }
    else if (tiposProduto.length == 1){
      return tiposProduto[0].price;
    }
    let precoMinimo = Math.min(...tiposProduto.map(((tipo:any) => tipo.price)));
    return precoMinimo
  }

  pesquisarProduto(produtoPesquisado:any){
    this.pesquisa = produtoPesquisado;
  }
}
