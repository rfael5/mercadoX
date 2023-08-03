import { Categoria } from "./categoria"

export interface Produto {
    id?:number
    titulo:string
    descricao:string
    imagemUrl:string
    preco:number
    categoria:Categoria
    idCategoria:number
}
