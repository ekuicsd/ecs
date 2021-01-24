import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Books } from "../models/books.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  private booksList: any = [];
  private curruntBooksSubject$: BehaviorSubject<Books[]> = new BehaviorSubject<Books[]>([] as Books[]);
  readonly curruntbooksList$ = this.curruntBooksSubject$.asObservable();
  private curruntCartSubject$: BehaviorSubject<Books[]> = new BehaviorSubject<Books[]>([] as Books[]);
  readonly curruntCartBooksList$ = this.curruntCartSubject$.asObservable();
  private curruntOrdersSubject$: BehaviorSubject<Books[]> = new BehaviorSubject<Books[]>([] as Books[]);
  readonly curruntOrdersList$ = this.curruntOrdersSubject$.asObservable();
  columns = ['title',
    'authors',
    'price',
    'average_rating',
    'language_code',
    'isbn',
    'bookID'
  ];

  constructor(private http: HttpClient) {
    this.curruntCartSubject$.next(this.getCartList());
    this.curruntOrdersSubject$.next(this.getOrdersList());
  }

  ngOnInit() {
  }

  getBooksData() {
    return this.http.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json").subscribe(res => {
      this.booksList = res;
      this.curruntBooksSubject$.next(this.booksList as Books[]);
    });
  }

  saveBooksData(list: Books[]) {
    this.curruntBooksSubject$.next(list);
  }

  saveCart(list: Books[]) {
    window.localStorage.setItem("cart", JSON.stringify(list));
    this.curruntCartSubject$.next(list);
  }

  saveOrders(list: Books[]) {
    window.localStorage.setItem("orders", JSON.stringify(list));
    this.curruntOrdersSubject$.next(list);
  }

  getCartList(): Books[] {
    let list = JSON.parse(window.localStorage.getItem("cart"));
    if (!list) {
      return [];
    }
    return list;
  }

  getOrdersList(): Books[] {
    let list = JSON.parse(window.localStorage.getItem("orders"));
    if (!list) {
      return [];
    }
    return list;
  }

}