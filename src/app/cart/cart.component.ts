import { Component, OnInit } from '@angular/core';
import { Books } from '../models/books.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: Books[] = [];
  flag = false;
  amount: number = 0;

  constructor(public _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.curruntCartBooksList$.subscribe(res => {
      this.cartList = res;
      if (!this.cartList || this.cartList.length == 0) {
        this.flag = true;
      } else {
        this.cartList.forEach(ele => {
          this.amount = this.amount + ele.price;
        });
      }
    });
  }

  removeFromCart(item) {
    let list = this.cartList;
    let index = list.map(ele => ele.bookID).indexOf(item.bookID);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this._apiService.saveCart(list);
  }

}
