import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LojaService } from 'src/app/shared/loja.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  produto:any

  constructor(private service:LojaService, private rota:ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarProduto(1);
  }

  buscarProduto(id:any){
    id = this.rota.snapshot.params['id']
    this.service.buscarProduto(id).subscribe(
      (data) => {
        this.produto = data.data;
        console.log(this.produto);
      }
    )
    console.log(id)
  }

}
