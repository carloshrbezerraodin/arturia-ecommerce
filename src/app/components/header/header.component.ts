import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/carrinho.model';
import { CarrinhoService} from '../../services/carrinho.service';
import { CarrinhoComponent } from 'src/app/pages/carrinho/carrinho.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private _cart: Cart = { items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart{
    return this._cart;
  }
  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuantity = cart.items
    .map((item)=> item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  constructor(private carrinhoService: CarrinhoService) { }

  getTotal(items: Array<CartItem>): number{
    return this.carrinhoService.getTotal(items);
  }

  onClearCart(){
    this.carrinhoService.limparCarrinho();
  }

}
