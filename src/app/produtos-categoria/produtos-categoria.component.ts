import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LojaService } from '../shared/loja.service';
import { ServiceResponse } from '../shared/serviceResponse';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../shared/categoria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produtos-categoria',
  templateUrl: './produtos-categoria.component.html',
  styleUrls: ['./produtos-categoria.component.css']
})
export class ProdutosCategoriaComponent implements OnInit {

  produtos!:ServiceResponse;

  routeChangeSubscription!:Subscription;

  teste!:string

  loading:boolean = false;
  
  constructor(private produtoService:LojaService, private categoriaService:CategoriaService, private rota:ActivatedRoute) { }

  ngOnInit(): void {

    this.armazenarDetalhesRota();

    this.routeChangeSubscription = this.categoriaService.getMudancaRota().subscribe((url) => {
      let categoriaProduto = this.rota.snapshot.params["pag"]
      console.log(categoriaProduto);
      this.buscarProdutosPorCategoria(categoriaProduto);
    })
  }

  ngOnDestroy():void {
    this.routeChangeSubscription.unsubscribe();
  }


  buscarProdutosPorCategoria(categoria:string){
    this.loading = true;
    this.produtoService.buscarProdutosPorCategoria(categoria).subscribe(
      (data:ServiceResponse) => {
        //console.log(categoria);
        this.produtos = data;
        //console.log(this.produtos);
        this.loading = false;
      }
    )
  }

  armazenarDetalhesRota(){
    let categoria = this.rota.snapshot.params["pag"];
    console.log(categoria);
    //console.log(categoria);
    this.buscarProdutosPorCategoria(categoria);
  }

}
