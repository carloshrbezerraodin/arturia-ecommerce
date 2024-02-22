import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/produto.model';

@Component({
  selector: 'app-produto-box',
  templateUrl: './produto-box.component.html',
  styleUrls: ['./produto-box.component.css']
})
export class ProdutoBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }

}
