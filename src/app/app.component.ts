import { Component, OnInit } from '@angular/core';
import { Cart } from './models/carrinho.model';
import { CarrinhoService } from './services/carrinho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'E-commerce Luna';
  cart: Cart = { items: []};
  constructor(private cartService: CarrinhoService){}

  ngOnInit(): void {
    this.start();
  }

  start(){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
