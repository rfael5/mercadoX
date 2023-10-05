import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../shared/carrinho.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProdutoCarrinho } from '../shared/produtoCarrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  
  local:any = localStorage.getItem('carrinho')
  //carrinho:any = JSON.parse(this.local);

  itensCarrinho:any;
  qtdTotal:any;

  novaQuantidade!:number;
  produtoAtualizado!:ProdutoCarrinho;


  constructor(private carrinhoService:CarrinhoService, private router:Router) { }

  ngOnInit(): void {
    //JSON.parse(this.carrinho);
    //console.log(this.carrinho);
    this.listarItensCarrinho();
  }

  listarItensCarrinho(){
    this.carrinhoService.listarItensCarrinho().subscribe(
      (dados) => {
        this.itensCarrinho = dados.data;
        this.carrinhoService.atualizarQtdCarrinho();
      }
    );
  }

  verDetalhesProduto(id:number){
    this.router.navigate([`detalhes-produto/${id}`])
  }

  removerItem(id:number){
    this.carrinhoService.removerItemCarrinho(id)
    .pipe(
      tap(() => this.listarItensCarrinho())
    ).subscribe();
  }

  atualizarQtdProduto(produto:any, qtdAtualizada:any){
    this.produtoAtualizado = {
      productId: produto.productId,    
      productTypeId: produto.productTypeId,
      cartItemName: produto.cartItemName,
      cartItemImg: produto.cartItemImg,
      cartItemTypeName: produto.cartItemTypeName,   
      price: produto.price,
      totalPrice: produto.price * Number(qtdAtualizada),
      quantity: Number(qtdAtualizada)
    }

    this.carrinhoService.atualizarQtdItens(produto.id, this.produtoAtualizado)
      .pipe(
        tap(() => this.listarItensCarrinho())
      ).subscribe();
  }

}
