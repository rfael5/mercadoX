import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LojaService } from '../shared/loja.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceResponse } from '../shared/serviceResponse';
import { Produto } from '../shared/produto';
import { Carrinho } from '../shared/carrinho';
import { CarrinhoService } from '../shared/carrinho.service';
import { ProdutoCarrinho } from '../shared/produtoCarrinho';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto!:any

  loading:boolean = false;

  tiposProduto:any;
  idTipoProduto:any = "";
  preco:any;
  qtdProduto:number = 1;
  precoOriginal:any;
  //carrinho:string[] = [];
  novoCarrinho!:Carrinho;
  produtoCarrinho!:ProdutoCarrinho;

  @Output() atualizarQtdCarrinho:EventEmitter<any> = new EventEmitter<any>()

  constructor(private service:LojaService, private rota:ActivatedRoute, private router:Router, public carrinhoService:CarrinhoService) { }

  ngOnInit(): void {
    this.buscarProduto();
    //this.selecionarPreco();
  }

  buscarProduto(){
    this.loading = true
    let id = this.rota.snapshot.params['id']
    this.service.buscarProduto(id).subscribe(
      (data) => {
        this.produto = data.data;
        this.tiposProduto = this.produto.variants;
        this.loading = false;
        this.selecionarPreco();
        console.log(this.produto);
      }
    )
  }


  selecionarPreco(){
    if(this.idTipoProduto == ""){
      this.idTipoProduto = this.tiposProduto[0]
    }
    this.preco = this.idTipoProduto.price;
    this.precoOriginal = this.idTipoProduto.originalPrice;
    console.log(this.idTipoProduto);
  }

  selecionarQuantidade(){
    let valorTotal = this.preco * this.qtdProduto;
    console.log(this.qtdProduto);
    console.log(this.preco);
    console.log(valorTotal);
  }

  inserirProdutoCarrinho(produto:any){
    /* 
    productId: number,    
    productTypeId?: number,
    cartItemName: string,
    cartItemImg: string,
    cartItemTypeName: string,   
    price: number,
    quantity: number
    */
    this.produtoCarrinho = {
      productId: produto.id,
      productTypeId: this.idTipoProduto.productTypeId,
      cartItemName: produto.title,
      cartItemImg: produto.imageUrl,
      cartItemTypeName: this.idTipoProduto.productType.name,
      price: this.idTipoProduto.price,
      totalPrice: this.preco * this.qtdProduto,
      quantity: this.qtdProduto
    }

    this.carrinhoService.inserirItensCarrinho(this.produtoCarrinho).pipe(
      tap(() => this.carrinhoService.atualizarQtdCarrinho())
    ).subscribe()
    console.log(this.produtoCarrinho);
  }

  adicionarAoCarrinho(produto:any){
    this.carrinhoService.adicionarProduto(produto);
    this.inserirProdutoCarrinho(produto);
    //this.atualizarQtdCarrinho.emit();
    //this.carrinhoService.atualizarQtdCarrinho();
  }

  buscarItensCarrinho(){
    this.carrinhoService.inicializarCarrinho();
  }

  verDetalhesProduto(id:number){
    this.router.navigate([`detalhes-produto/${id}`])
  }

}
