import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent implements OnInit {

  @Input() produto!:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.produto)
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

}
