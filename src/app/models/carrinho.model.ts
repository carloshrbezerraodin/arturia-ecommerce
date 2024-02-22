import { Usuario } from "./usuario.model";

export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
  user: Usuario;
}
