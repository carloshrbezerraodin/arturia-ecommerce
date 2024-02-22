import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/produto.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  db1: any;

  constructor(private httpClient: HttpClient) { }

  inserirProdutosBancodeDados(){
    this.db1 = (<any> window).openDatabase('arturia', '', 'Arturia Ecommerce', 2 * 1024 * 1024);
    this.db1.transaction(function (tx: any) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS produto (id integer, preco text, descricao text"); });
   
    const limit = '12', sort= 'desc';
    this.getAllProducts(limit, sort)
    .subscribe((_products)=> {
      _products.forEach(produto => {
        this.db1.transaction(function (tx: any){
          tx.executeSql("INSERT INTO produto (id, preco, descricao) VALUES (?,?,?)", [produto.id, produto.price, produto.description]);
      })
      });
    });
  }

  getAllProducts(limit = '12', sort= 'desc'): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    )
  }

  getAllProdutosBancoDeDados(): Array<Product>{
  
    let produtos: Array<Product>;
    produtos = [];

    this.db1 = (<any> window).openDatabase('arturia', '', 'Arturia Ecommerce', 2 * 1024 * 1024);
    this.db1.transaction(function (tx: any) {   
      tx.executeSql('SELECT * FROM produto', [], function (tx: any, results: any) {   
        var len = results.rows.length, i;        
        for (i = 0; i < len; i++) {   
           produtos.push(results.rows.item(i));  
        }   
      
     }, null); 
   });

    return produtos;
  };
}
