import { Component, OnInit } from '@angular/core';
import { LojaService } from '../shared/loja.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceResponse } from '../shared/serviceResponse';
import { Produto } from '../shared/produto';

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
  precoOriginal:any;

  constructor(private service:LojaService, private rota:ActivatedRoute) { }

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
        this.tiposProduto = this.produto.variants
        console.log(this.produto);
        console.log(this.tiposProduto);
        this.loading = false;
        this.selecionarPreco();
      }
    )
    console.log(id)
  }

  selecionarPreco(){
    if(this.idTipoProduto == ""){
      this.idTipoProduto = this.tiposProduto[0]
    }
    this.preco = this.idTipoProduto.price;
    this.precoOriginal = this.idTipoProduto.originalPrice;
    
    // console.log(this.idTipoProduto);
    // console.log("oi");
    
    // console.log(this.preco);
  }

}
