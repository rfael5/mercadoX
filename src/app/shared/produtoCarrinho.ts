import { Produto } from "./produto";

export interface ProdutoCarrinho {
    productId: number,    
    productTypeId?: number,
    cartItemName: string,
    cartItemImg: string,
    cartItemTypeName: string,   
    price: number,
    totalPrice: number,
    quantity: number
}
