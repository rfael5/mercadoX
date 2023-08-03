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

  constructor(private service:LojaService, private rota:ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarProduto();
  }

  buscarProduto(){
    this.loading = true
    let id = this.rota.snapshot.params['id']
    this.service.buscarProduto(id).subscribe(
      (data) => {
        this.produto = data.data;
        console.log(this.produto);
        this.loading = false
      }
    )
    console.log(id)
  }

}
