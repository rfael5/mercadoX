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
  
  loading:boolean = false;

  constructor(private service:LojaService, private router:Router) { }

  ngOnInit(): void {
    this.listarProdutos()
  }

  listarProdutos(){
    this.loading = true;
    this.service.listarProdutos().subscribe(
      (data) => {
        this.produtos = data
        //console.log(this.produtos)
        this.loading = false;
      }
    )
  }

  goToProduct(id:number){
    this.router.navigate([`detalhes-produto/${id}`])
  }

}
