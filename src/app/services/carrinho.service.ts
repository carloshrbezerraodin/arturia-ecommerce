import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  cart = new BehaviorSubject<Cart>({ items: []});
  db1: any;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(){
    this.db1 = (<any> window).openDatabase('arturia', '', 'Arturia Ecommerce', 2 * 1024 * 1024);
  }

  adicionarCariinho(item: CartItem): void{
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => item.id === _item.id);

    if(itemInCart){
      itemInCart.quantity += 1;
    }else{
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item adicionado no carrinho', 'Ok', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number{
    return items.map((item)=> item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  limparCarrinho(): void{
    this.cart.next({ items: []});
    this._snackBar.open('Carrinho limpo', 'Ok', {duration: 3000});
  }

  remover(item: CartItem, update = true): Array<CartItem>{
    const filteredItems = this.cart.value.items.filter(
      (_item)=> _item.id !== item.id
    );

    if(update){
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removido do carrinho', 'Ok', { duration: 3000});
    }

    return filteredItems;
  }

  removerQuantidade(item: CartItem): void{
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id){
        _item.quantity--;
        if(_item.quantity === 0){
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if(itemForRemoval){
      filteredItems = this.remover(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removido', 'Ok', { duration: 3000});
  }

  realizarcompra() {
    const items = [...this.cart.value.items];
    this.ngOnInit();
    this.db1.transaction(function (tx: any) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS carrinho (id integer, user text, produto text, preco number, quantidade number)"); });
   
    items.forEach(item => {
        this.db1.transaction(function (tx: any){
        tx.executeSql("INSERT INTO people (id, user, produto, preco, quantidade) VALUES (?,?,?,?,?)", [item.id, item.user, item.product, item.price, item.quantity]);
        });
    });
  }
}
