import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-campo-pesquisa',
  templateUrl: './campo-pesquisa.component.html',
  styleUrls: ['./campo-pesquisa.component.css']
})
export class CampoPesquisaComponent implements OnInit {

  @Output() emitirValor:EventEmitter<any> = new EventEmitter<any>()
  valorPesquisa:string = ''

  constructor() { }

  ngOnInit(): void {
  }

  valorPesquisado(){
    this.emitirValor.emit(this.valorPesquisa)
  }

}
