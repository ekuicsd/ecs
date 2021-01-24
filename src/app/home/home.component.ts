import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Books } from '../models/books.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  booksList: Books[] = [];
  searchByName: string = '';
  page = 1;
  pageSize = 25;
  cartList: Books[] = [];

  constructor(public _apiService: ApiService,
    config: NgbPaginationConfig,) {
    config.size = 'sm';
    config.maxSize = 10;
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this._apiService.curruntbooksList$.subscribe(res => {
      this.booksList = res;
      this.booksList.sort((a, b) => (Number(a.ratings_count) < Number(b.ratings_count)) ? 1 : ((Number(b.ratings_count) < Number(a.ratings_count)) ? -1 : 0));
    });
    this._apiService.curruntCartBooksList$.subscribe(res => {
      this.cartList = res;
    })
  }

  addToComponents(data) {
    if (data.target.cheched) {
      this._apiService.columns.push(data.target.value);
    } else {
      let index = this._apiService.columns.indexOf(data.target.value);
      if (index !== -1) {
        this._apiService.columns.splice(index, 1);
      }
    }
  }

  ifExists(data) {
    let index = this._apiService.columns.indexOf(data);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  addToCart(item) {
    let list = this.cartList;
    list.push(item);
    this._apiService.saveCart(list);
  }

  alreadyAddedToCart(item) {
    if (this.cartList || this.cartList.length >= 0) {
      let index = this.cartList.map(ele => ele.bookID).indexOf(item.bookID);
      if (index !== -1) {
        return true;
      }
    }
    return false;
  }

}
