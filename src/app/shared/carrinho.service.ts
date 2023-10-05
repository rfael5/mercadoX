import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { Observable, Subject, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProdutoCarrinho } from './produtoCarrinho';
import { ServiceResponse } from './serviceResponse';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  url = "https://localhost:7269/api/Cart/"

  public carrinho:Produto[] = []
  public qtdProdutosCarrinho!:number;

  constructor(private http:HttpClient) { }

  adicionarProduto(produto:Produto){
    this.carrinho.push(produto);
    this.atualizarLocalStorage();
  }

  private atualizarLocalStorage(){
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    this.inicializarCarrinho();
  }

  inicializarCarrinho(){
    const carrinho = localStorage.getItem('carrinho');
    if(carrinho){
      this.carrinho = JSON.parse(carrinho);
    }    
  }

  atualizarQtdCarrinho(){
    this.listarItensCarrinho().subscribe(
      (dados) => {
        const qtdTotal = dados.data.reduce((total:number, produto:any) => total + produto.quantity, 0);
        this.qtdProdutosCarrinho = qtdTotal;
      }
    )
  }

  buscarProdutosCarrinho(itens:any):Observable<any> {
    return this.http.post<any>(`${this.url}products`, itens);
  }

  inserirItensCarrinho(produto:ProdutoCarrinho):Observable<ProdutoCarrinho> {
    return this.http.post<ProdutoCarrinho>(`${this.url}inserir-carrinho`, produto);
  }

  listarItensCarrinho():Observable<any> {
    return this.http.get<ServiceResponse>(`${this.url}buscar-itens-carrinho`)
  }

  removerItemCarrinho(id:number):Observable<any> {
    return this.http.delete<ServiceResponse>(`${this.url}remover-item-carrinho/${id}`);
  }

  atualizarQtdItens(id:number, produto:ProdutoCarrinho):Observable<any>{
    return this.http.post<ProdutoCarrinho>(`${this.url}atualizar-qtd/${id}`, produto);
  }
}
