import { Component, OnInit } from '@angular/core';
import { Books } from '../models/books.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersList: Books[] = [];
  flag = false;

  constructor(public _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.curruntOrdersList$.subscribe(res => {
      this.ordersList = res;
      if (!this.ordersList || this.ordersList.length == 0) {
        this.flag = true;
      }
    });
  }
}
