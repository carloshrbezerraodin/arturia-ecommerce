import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/produto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  category: string | undefined;
  cols: number = 4;
  rowHeight = ROWS_HEIGHT[this.cols];
  produtos: Array<Product> | undefined;
  sort: string = 'desc';
  count: string = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CarrinhoService, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    try {
    this.produtoService.inserirProdutosBancodeDados();
   } catch(err) {
    console.log(err);
   }
    this.getProdutos();
  }

  getProdutos(): void{

    try {
        this.produtos = this.produtoService.getAllProdutosBancoDeDados();
    } catch(err) {
      console.log(err);
    }

  if (this.produtos == undefined) {
    this.productSubscription = this.produtoService.getAllProducts(this.count, this.sort)
    .subscribe((_products)=> {
      this.produtos = _products;
    })
  }

  }

  onColumnsCountChange(colsNumber: number): void{
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
    console.log(`Entrou no onColumns - Cols = ${this.cols}`);
    console.log(`Entrou no onColumns - RowHeight = ${this.rowHeight}`);
  }

  onShowCategory(newCategory: string): void{
    this.category = newCategory;
  }

  onAddToCart(product: Product): void{
    let usuario: any = localStorage.getItem('usuario');
    this.cartService.adicionarCariinho({
      product: product.description,
      name: product.description,
      price: product.price,
      quantity: 1,
      id: product.id, 
      user: usuario
    });
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

}
