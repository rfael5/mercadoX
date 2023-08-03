import { Component } from '@angular/core';
import { CategoriaService } from './shared/categoria.service';
import { ServiceResponse } from './shared/serviceResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from './shared/loja.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerceX-front';

  categorias!:ServiceResponse;

  loading:boolean = false;

  constructor(
    private categoriaService:CategoriaService,
    private router:Router) {}

  ngOnInit():void {
    this.listarCategorias();
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
}
