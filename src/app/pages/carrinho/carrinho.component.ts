import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/carrinho.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  cart: Cart = { items: [
  {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
    user: {
      id: 1,
      name: 'carlos'
    }
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 120,
    quantity: 5,
    id: 2,
    user: {
      id: 1,
      name: 'carlos'
    }
  },
]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]
  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.start();
  }

  start(){
    this.carrinhoService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number{
    return this.carrinhoService.getTotal(items);
  }

  limparCarrinho(): void{
    this.carrinhoService.limparCarrinho();
  }

  onRemoverCarrinho(item: CartItem): void{
    this.carrinhoService.remover(item);
  }

  onAdicionarQuantidade(item: CartItem): void{
    this.carrinhoService.adicionarCariinho(item);
  }

  removerQuantidade(item: CartItem): void{
    this.carrinhoService.removerQuantidade(item);
  }

  realizarCompra(): void {
    this.carrinhoService.realizarcompra();
  }

}
